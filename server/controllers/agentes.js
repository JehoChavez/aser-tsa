const { Op } = require("sequelize");
const { Agente } = require("../models");
const CustomResponse = require("../utils/CustomResponse");
const ExpressError = require("../utils/ExpressError");

module.exports.getAgentes = async (req, res) => {
  const { aseguradoras } = req.query;

  let listOfAgentes = [];

  if (aseguradoras) {
    const aseguradoraIds = aseguradoras.split(",");
    listOfAgentes = await Agente.findAll({
      where: {
        aseguradoraId: {
          [Op.in]: aseguradoraIds,
        },
      },
    });
  } else {
    listOfAgentes = await Agente.findAll();
  }

  if (!listOfAgentes[0]) throw new ExpressError("Agentes no encontrados", 404);

  const response = new CustomResponse(listOfAgentes);

  res.json(response);
};
