const { Agente } = require("../models");
const CustomResponse = require("../utils/CustomResponse");
const ExpressError = require("../utils/ExpressError");

module.exports.getAgentes = async (req, res) => {
  const { aseguradoraId } = req.body;

  let listOfAgentes = [];

  if (aseguradoraId) {
    listOfAgentes = await Agente.findAll({
      where: {
        aseguradoraId: aseguradoraId,
      },
    });
  } else {
    listOfAgentes = await Agente.findAll();
  }

  const response = new CustomResponse(listOfAgentes);

  res.json(response);
};
