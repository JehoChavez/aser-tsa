const { Cliente, Estado, Municipio } = require("../models");
const { Op } = require("sequelize");
const CustomResponse = require("../utils/CustomResponse");
const ExpressError = require("../utils/ExpressError");

module.exports.getClientes = async (req, res) => {
  const { nombre, tipoPersona, estadoId } = req.query;

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

  const listOfClientes = await Cliente.findAll({
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
    order: [["createdAt", "DESC"]],
  });

  const response = new CustomResponse(listOfClientes);

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
  const cliente = await Cliente.create(req.body);

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
