const { Cliente, Estado, Municipio, sequelize } = require("../models");
const { Op } = require("sequelize");
const CustomResponse = require("../utils/CustomResponse");
const ExpressError = require("../utils/ExpressError");
const csv = require("csv-parser");
const { Readable } = require("stream");
const { clienteSchema } = require("../utils/validator");

module.exports.getClientes = async (req, res) => {
  const {
    nombre,
    tipoPersona,
    estadoId,
    page = 1,
    limit = 10,
    orden = "DESC",
    por = "createdAt",
  } = req.query;

  const filter = {};

  // Find cliente by nombre provided by frontend
  if (nombre) {
    filter.nombre = {
      [Op.like]: `%${nombre}%`,
    };
  }

  // Filters
  if (tipoPersona) {
    filter.tipoPersona = tipoPersona;
  }

  if (estadoId) {
    filter.estadoId = estadoId;
  }

  const options = {
    where: filter,
    attributes: [
      "id",
      "tipoPersona",
      "nombre",
      "rfc",
      "correo",
      "telefono",
      "empresa",
    ],
    order: [[por, orden]],
  };

  // Pagination
  if (page) {
    options.offset = (parseInt(page) - 1) * (parseInt(limit) || options.limit);
  }

  if (limit) {
    options.limit = parseInt(limit);
  }

  const { count, rows: clientes } = await Cliente.findAndCountAll(options);

  const response = new CustomResponse(clientes, undefined, undefined, count);

  res.status(response.status).json(response);
};

module.exports.getCliente = async (req, res) => {
  const cliente = await Cliente.findByPk(req.params.id, {
    include: [
      {
        model: Estado,
        as: "estado",
      },
      {
        model: Municipio,
        as: "municipio",
      },
    ],
    attributes: {
      exclude: ["estadoId", "municipioId"],
    },
  });

  if (!cliente) throw new ExpressError("Cliente no encontrado", 404);

  const response = new CustomResponse(cliente);

  res.status(response.status).json(response);
};

module.exports.postCliente = async (req, res) => {
  const clienteData = req.body;

  if (clienteData.estadoId === "0") clienteData.estadoId = null;
  if (clienteData.municipioId === "0" || clienteData.municipioId === 0)
    clienteData.municipioId = null;

  const cliente = await Cliente.create(clienteData);

  const response = new CustomResponse(cliente, 201);

  res.status(response.status).json(response);
};

module.exports.deleteCliente = async (req, res) => {
  const cliente = await Cliente.findByPk(req.params.id);

  if (!cliente) throw new ExpressError("Cliente no encontrado", 404);

  await cliente.destroy();

  const response = new CustomResponse(cliente);

  res.status(response.status).json(response);
};

module.exports.updateCliente = async (req, res) => {
  const cliente = await Cliente.findByPk(req.params.id);

  if (!cliente) throw new ExpressError("Cliente no encontrado", 404);

  cliente.set(req.body);

  const updated = await cliente.save();

  const response = new CustomResponse(updated);

  res.status(response.status).json(response);
};

module.exports.uploadClientes = async (req, res) => {
  const results = [];
  const errors = [];

  let csvString = req.file.buffer.toString("utf8");
  if (csvString.charCodeAt(0) === 0xfeff) {
    csvString = csvString.slice(1);
  }

  const stream = Readable.from(csvString);

  const processRow = async (row) => {
    const { estado, municipio, ...entry } = row;

    if (entry.nacimiento) {
      entry.nacimiento = entry.nacimiento.split("/").reverse().join("-");
    }

    const t = await sequelize.transaction();

    try {
      if (estado && estado instanceof String) {
        const existingEstado = await Estado.findOne({
          where: {
            estado: {
              [Op.like]: estado,
            },
          },
          transaction: t,
        });

        entry.estadoId = existingEstado.id;
      }

      if (municipio && municipio instanceof String) {
        const existingMunicipio = await Municipio.findOne({
          where: {
            municipio: {
              [Op.like]: municipio,
            },
          },
          transaction: t,
        });

        entry.municipioId = existingMunicipio.id;
      }

      const { error, value } = clienteSchema.validate(entry);

      if (error) {
        errors.push({ error: error.details[0].message, row });
      } else {
        const existingCliente = await Cliente.findOne({
          where: {
            nombre: value.nombre,
          },
          transaction: t,
        });

        if (existingCliente) {
          errors.push({
            error: `Cliente ${value.nombre} ya existe`,
          });
        } else {
          const newCliente = await Cliente.create(value, {
            transaction: t,
          });

          if (newCliente) results.push(newCliente);
        }
      }

      await t.commit();
    } catch (error) {
      console.log(error);
      await t.rollback();
      errors.push({ error: error.message, row });
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
          "No se ha creado ningún cliente"
        );
        res.status(response.status).json(response);
      } else {
        const response = new CustomResponse({ results, errors });

        res.status(response.status).json(response);
      }
    });
};
