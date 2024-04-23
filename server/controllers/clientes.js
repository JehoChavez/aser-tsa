const { Cliente } = require("../models");
const CustomResponse = require("../utils/CustomResponse");
const ExpressError = require("../utils/ExpressError");
const { validateCliente } = require("../utils/validator");

module.exports.getClientes = async (req, res) => {
  const listOfClientes = await Cliente.findAll();

  const response = new CustomResponse(listOfClientes);

  res.json(response);
};

module.exports.getCliente = async (req, res) => {
  const id = req.params.id;
  res.send(`Cliente ${id}`);
};

module.exports.postCliente = async (req, res) => {
  const { error, value } = validateCliente(req.body);

  if (error) throw new ExpressError(error.details[0].message, 400);

  const cliente = await Cliente.create(value);

  const response = new CustomResponse(cliente);

  res.json(response);
};
