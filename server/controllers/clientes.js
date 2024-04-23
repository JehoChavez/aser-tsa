const { Cliente, Estado, Municipio } = require("../models");
const CustomResponse = require("../utils/CustomResponse");
const ExpressError = require("../utils/ExpressError");
const { validateCliente, validateGenericId } = require("../utils/validator");

module.exports.getClientes = async (req, res) => {
  const listOfClientes = await Cliente.findAll();

  const response = new CustomResponse(listOfClientes);

  res.json(response);
};

module.exports.getCliente = async (req, res) => {
  const { error, value } = validateGenericId(req.params);

  if (error) throw new ExpressError(error.details[0].message, 400);

  const cliente = await Cliente.findByPk(value.id, {
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
  const { error, value } = validateCliente(req.body);

  if (error) throw new ExpressError(error.details[0].message, 400);

  const cliente = await Cliente.create(value);

  const response = new CustomResponse(cliente);

  res.json(response);
};

module.exports.deleteCliente = async (req, res) => {
  const { error, value } = validateGenericId(req.params);

  if (error) throw new ExpressError(error.details[0].message, 400);

  const cliente = await Cliente.findByPk(value.id);

  await cliente.destroy();

  if (!cliente) throw new ExpressError("Cliente no encontrado", 404);

  const response = new CustomResponse(cliente);

  res.json(response);
};
