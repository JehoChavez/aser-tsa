const { Op } = require("sequelize");
const { Agente, Aseguradora, sequelize } = require("../models");
const CustomResponse = require("../utils/CustomResponse");
const ExpressError = require("../utils/ExpressError");
const csv = require("csv-parser");
const { Readable } = require("stream");
const { agenteSchema } = require("../utils/validator");

module.exports.getAgentes = async (req, res) => {
  const { aseguradora } = req.query;

  let listOfAgentes = [];

  // Get agentes from aseguradoras if aseguradorasIds exists, get all if not
  if (aseguradora) {
    listOfAgentes = await Agente.findAll({
      where: {
        aseguradoraId: {
          [Op.in]: aseguradora,
        },
      },
      include: {
        model: Aseguradora,
        as: "aseguradora",
      },
    });
  } else {
    listOfAgentes = await Agente.findAll({
      include: {
        model: Aseguradora,
        as: "aseguradora",
        attributes: ["id", "aseguradora"],
      },
      order: [["nombre", "ASC"]],
    });
  }

  const response = new CustomResponse(listOfAgentes);

  res.status(response.status).json(response);
};

module.exports.getAgente = async (req, res) => {
  const agente = await Agente.findByPk(req.params.id, {
    include: [
      {
        model: Aseguradora,
        as: "aseguradora",
        attributes: ["id", "aseguradora"],
      },
    ],
  });

  if (!agente) throw new ExpressError("agente no encontrado", 404);

  const response = new CustomResponse(agente, 201);

  res.status(response.status).json(response);
};

module.exports.postAgente = async (req, res) => {
  // Check if agente already exists
  const existingAgent = await Agente.findOne({
    where: {
      clave: req.body.clave,
      aseguradoraId: req.body.aseguradoraId,
    },
  });

  if (existingAgent) throw new ExpressError("agente ya existente", 400);

  const aseguradora = await Aseguradora.findByPk(req.body.aseguradoraId);

  if (!aseguradora) throw new ExpressError("aseguradora no encontrada", 404);

  const newAgente = await Agente.create(req.body);

  const response = new CustomResponse(newAgente, 201);

  res.status(response.status).json(response);
};

module.exports.updateAgente = async (req, res) => {
  const agenteUpdate = await Agente.findByPk(req.params.id);
  if (!agenteUpdate) throw new ExpressError("Agente no encontrado", 404);

  agenteUpdate.set(req.body);

  const updated = await agenteUpdate.save();

  const response = new CustomResponse(updated);

  res.status(response.status).json(response);
};

module.exports.deleteAgente = async (req, res) => {
  const agente = await Agente.findByPk(req.params.id);
  if (!agente) throw new ExpressError("agente no encontrado", 404);

  await agente.destroy();

  const response = new CustomResponse(agente);

  res.status(response.status).json(response);
};

module.exports.uploadAgentes = async (req, res) => {
  if (!req.file) throw new ExpressError("No se ha subido ningún archivo", 400);

  const results = [];
  const errors = [];

  let csvString = req.file.buffer.toString("utf8");
  if (csvString.charCodeAt(0) === 0xfeff) {
    csvString = csvString.slice(1);
  }

  const stream = Readable.from(csvString);

  const processRow = async (row) => {
    const t = await sequelize.transaction();

    try {
      const aseguradora = await Aseguradora.findOne({
        where: {
          aseguradora: {
            [Op.like]: row.aseguradora,
          },
        },
        transaction: t,
      });

      if (!aseguradora) {
        errors.push({
          error: `Aseguradora ${row.aseguradora} no encontrada`,
          row,
        });
      } else {
        const { aseguradora: aseguradoraObj, ...entry } = {
          ...row,
          aseguradoraId: aseguradora.id,
        };

        const { error, value } = agenteSchema.validate(entry);

        if (error) {
          errors.push({ error: error.details[0].message, row });
        } else {
          const existingAgente = await Agente.findOne({
            where: {
              clave: entry.clave,
              aseguradoraId: aseguradora.id,
            },
            transaction: t,
          });
          if (existingAgente) {
            errors.push({
              error: `Agente ${entry.clave} ya existente`,
              row,
            });
          } else {
            const agente = await aseguradora.createAgente(value, {
              transaction: t,
            });
            if (agente) results.push(agente);
          }
        }
      }
      await t.commit();
    } catch (error) {
      await t.rollback();
      errors.push({ error: error.message, row });
    }
  };

  const promises = [];

  stream
    .pipe(csv())
    .on("data", async (row) => {
      promises.push(processRow(row));
    })
    .on("error", (error) => {
      throw new ExpressError(error.message, 400);
    })
    .on("end", async () => {
      await Promise.all(promises);

      if (results.length === 0) {
        const response = new CustomResponse(
          { errors },
          400,
          "No se ha creado ningún agente"
        );
        res.status(response.status).json(response);
      } else {
        const response = new CustomResponse({ results, errors });

        res.status(response.status).json(response);
      }
    });
};
