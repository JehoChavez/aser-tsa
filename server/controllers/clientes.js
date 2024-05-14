const { Cliente, Estado, Municipio } = require("../models");
const CustomResponse = require("../utils/CustomResponse");
const ExpressError = require("../utils/ExpressError");

module.exports.getClientes = async (req, res) => {
  const listOfClientes = await Cliente.findAll({
    attributes: ["id", "tipoPersona", "nombre", "rfc"],
  });

  const response = new CustomResponse(listOfClientes);

  res.json(response);
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

  res.json(response);
};

module.exports.postCliente = async (req, res) => {
  const cliente = await Cliente.create(req.body);

  const response = new CustomResponse(cliente, 201);

  res.json(response);
};

module.exports.deleteCliente = async (req, res) => {
  const cliente = await Cliente.findByPk(req.params.id);

  if (!cliente) throw new ExpressError("Cliente no encontrado", 404);

  await cliente.destroy();

  const response = new CustomResponse(cliente);

  res.json(response);
};

module.exports.updateCliente = async (req, res) => {
  const cliente = await Cliente.findByPk(req.params.id);

  if (!cliente) throw new ExpressError("Cliente no encontrado", 404);

  cliente.set(req.body);

  const updated = await cliente.save();

  const response = new CustomResponse(updated);

  res.json(response);
};
