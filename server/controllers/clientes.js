const { Cliente } = require("../models");
const CustomResponse = require("../utils/CustomResponse");
const ExpressError = require("../utils/ExpressError");

module.exports.getClientes = async (req, res) => {
  const listOfClientes = await Cliente.findAll();

  const response = new CustomResponse(listOfClientes);

  res.json(response);
};
