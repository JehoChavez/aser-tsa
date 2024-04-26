const { Estado } = require("../models");
const CustomResponse = require("../utils/CustomResponse");

module.exports.getEstados = async (req, res) => {
  const listOfEstados = await Estado.findAll();

  const response = new CustomResponse(listOfEstados);

  res.json(response);
};
