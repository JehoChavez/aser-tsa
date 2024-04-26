const { Poliza } = require("../models");
const CustomResponse = require("../utils/CustomResponse");

module.exports.getPolizas = async (req, res) => {
  const listOfPolizas = await Poliza.findAll();

  const response = new CustomResponse(listOfPolizas);

  res.json(response);
};
