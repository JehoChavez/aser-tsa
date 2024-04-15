const { Agente } = require("../models");
const CustomResponse = require("../utils/CustomResponse");
const ExpressError = require("../utils/ExpressError");

module.exports.getAgentes = async (req, res) => {
  const listOfAgentes = await Agente.findAll();

  const response = new CustomResponse(listOfAgentes);

  res.json(response);
};
