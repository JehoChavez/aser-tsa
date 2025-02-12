const { Aseguradora, Sequelize, sequelize } = require("../models");
const CustomResponse = require("../utils/CustomResponse");
const ExpressError = require("../utils/ExpressError");
const csv = require("csv-parser");
const { Readable } = require("stream");
const { aseguradoraSchema } = require("../utils/validator");

module.exports.getAseguradoras = async (req, res) => {
  const listOfAseguradoras = await Aseguradora.findAll({
    order: [
      [
        Sequelize.literal(
          `CASE WHEN aseguradora = 'Default' THEN 0 ELSE 1 END`
        ),
        "ASC",
      ],
      ["aseguradora", "ASC"],
    ],
  });

  const response = new CustomResponse(listOfAseguradoras);

  res.status(response.status).json(response);
};

module.exports.getAseguradora = async (req, res) => {
  const aseguradora = await Aseguradora.findByPk(req.params.id);

  if (!aseguradora) throw new ExpressError("aseguradora no encontrada", 404);

  const response = new CustomResponse(aseguradora);

  res.status(response.status).json(response);
};

module.exports.postAseguradora = async (req, res) => {
  const newAseguradora = await Aseguradora.create(req.body);

  const response = new CustomResponse(newAseguradora, 201);

  res.status(response.status).json(response);
};

module.exports.deleteAseguradora = async (req, res) => {
  const aseguradora = await Aseguradora.findByPk(req.params.id);

  if (!aseguradora) throw new ExpressError("aseguradora no encontrada", 404);

  await aseguradora.destroy();

  const response = new CustomResponse(aseguradora);

  res.status(response.status).json(response);
};

module.exports.updateAseguradora = async (req, res) => {
  const aseguradoraUpdate = await Aseguradora.findByPk(req.params.id);

  if (!aseguradoraUpdate)
    throw new ExpressError("aseguradora no encontrada", 404);

  aseguradoraUpdate.set(req.body);

  const updated = await aseguradoraUpdate.save();

  const response = new CustomResponse(updated);

  res.status(response.status).json(response);
};

module.exports.uploadAseguradoras = async (req, res) => {
  if (!req.file) throw new ExpressError("No se ha subido ningún archivo", 400);

  const results = [];
  const errors = [];

  let csvString = req.file.buffer.toString("utf8");
  if (csvString.charCodeAt(0) === 0xfeff) {
    csvString = csvString.slice(1);
  }

  const stream = Readable.from(csvString);

  const processRow = async (row) => {
    const entry = {
      aseguradora: row.aseguradora,
      plazoPrimer: row.plazoPrimerPago,
      plazoSubsecuentes: row.plazoPagosSubsecuentes,
      comentarios: row.comentarios,
    };
    const { error, value } = aseguradoraSchema.validate(entry);

    if (error) {
      errors.push({ error: error.details[0].message, row });
    } else {
      const t = await sequelize.transaction();

      try {
        const aseguradora = await Aseguradora.findOne({
          where: {
            aseguradora: value.aseguradora,
          },
          transaction: t,
        });

        if (aseguradora) {
          errors.push({
            error: `Aseguradora ${value.aseguradora} ya existe`,
            row,
          });
        } else {
          const newAseguradora = await Aseguradora.create(value, {
            transaction: t,
          });

          if (newAseguradora) results.push(newAseguradora);
        }

        await t.commit();
      } catch (error) {
        await t.rollback();
        errors.push({ error: error.message, row });
      }
    }
  };

  const promises = [];

  stream
    .pipe(csv())
    .on("data", (row) => {
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
          "No se ha creado ninguna aseguradora"
        );
        res.status(response.status).json(response);
      } else {
        const response = new CustomResponse({ results, errors });

        res.status(response.status).json(response);
      }
    });
};
