const { Op } = require("sequelize");
const { Agente, Aseguradora } = require("../models");
const CustomResponse = require("../utils/CustomResponse");
const ExpressError = require("../utils/ExpressError");

module.exports.getAgentes = async (req, res) => {
  const { aseguradora } = req.query;

  let listOfAgentes = [];

  // Get agentes from aseguradoras if aseguradorasIds exists, get all if not
  if (aseguradora) {
    listOfAgentes = await Agente.findAll({
      where: {
        aseguradoraId: {
          [Op.in]: aseguradora,
        },
      },
      include: {
        model: Aseguradora,
        as: "aseguradora",
      },
    });
  } else {
    listOfAgentes = await Agente.findAll({
      include: {
        model: Aseguradora,
        as: "aseguradora",
        attributes: ["id", "aseguradora"],
      },
      order: [["nombre", "ASC"]],
    });
  }

  const response = new CustomResponse(listOfAgentes);

  res.status(response.status).json(response);
};

module.exports.getAgente = async (req, res) => {
  const agente = await Agente.findByPk(req.params.id, {
    include: [
      {
        model: Aseguradora,
        as: "aseguradora",
        attributes: ["id", "aseguradora"],
      },
    ],
  });

  if (!agente) throw new ExpressError("agente no encontrado", 404);

  const response = new CustomResponse(agente, 201);

  res.status(response.status).json(response);
};

module.exports.postAgente = async (req, res) => {
  // Check if agente already exists
  const existingAgent = await Agente.findOne({
    where: {
      clave: req.body.clave,
      aseguradoraId: req.body.aseguradoraId,
    },
  });

  if (existingAgent) throw new ExpressError("agente ya existente", 400);

  const aseguradora = await Aseguradora.findByPk(req.body.aseguradoraId);

  if (!aseguradora) throw new ExpressError("aseguradora no encontrada", 404);

  const newAgente = await Agente.create(req.body);

  const response = new CustomResponse(newAgente, 201);

  res.status(response.status).json(response);
};

module.exports.updateAgente = async (req, res) => {
  const agenteUpdate = await Agente.findByPk(req.params.id);
  if (!agenteUpdate) throw new ExpressError("Agente no encontrado", 404);

  agenteUpdate.set(req.body);

  const updated = await agenteUpdate.save();

  const response = new CustomResponse(updated);

  res.status(response.status).json(response);
};

module.exports.deleteAgente = async (req, res) => {
  const agente = await Agente.findByPk(req.params.id);
  if (!agente) throw new ExpressError("agente no encontrado", 404);

  await agente.destroy();

  const response = new CustomResponse(agente);

  res.status(response.status).json(response);
};
