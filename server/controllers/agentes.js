const { Op } = require("sequelize");
const { Agente } = require("../models");
const CustomResponse = require("../utils/CustomResponse");
const ExpressError = require("../utils/ExpressError");
const {
  validateIdArray,
  validateAgent,
  validateGenericId,
} = require("../utils/validator");

module.exports.getAgentes = async (req, res) => {
  const { aseguradoraIds } = req.query;

  let listOfAgentes = [];

  if (aseguradoraIds) {
    const { error, value: aseguradoras } = validateIdArray(aseguradoraIds);

    if (error) {
      throw new ExpressError(error.details[0].message, 400);
    }

    listOfAgentes = await Agente.findAll({
      where: {
        aseguradoraId: {
          [Op.in]: aseguradoras,
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

module.exports.postAgente = async (req, res) => {
  const { error, value: agenteObj } = validateAgent(req.body);

  if (error) {
    throw new ExpressError(error.details[0].message, 400);
  }

  const newAgente = await Agente.create(agenteObj);

  const response = new CustomResponse(newAgente);

  res.json(response);
};

module.exports.updateAgente = async (req, res) => {
  const { error: idError, value: agenteId } = validateGenericId(req.params);

  if (idError) throw new ExpressError(idError.details[0].message, 400);

  const { error: agenteError, value: agenteData } = validateAgent(req.body);
  if (agenteError) throw new ExpressError(agenteError.details[0].message, 400);

  const agenteUpdate = await Agente.findByPk(agenteId.id);
  if (!agenteUpdate) throw new ExpressError("Agente no encontrado", 404);

  agenteUpdate.set({
    agenteData,
  });

  const updated = await agenteUpdate.save();

  const response = new CustomResponse(updated);

  res.json(response);
};
