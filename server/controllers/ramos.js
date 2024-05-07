const { Ramo } = require("../models");
const ExpressError = require("../utils/ExpressError");
const CustomResponse = require("../utils/CustomResponse");

module.exports.getRamos = async (req, res) => {
  const listOfRamos = await Ramo.findAll();

  const response = new CustomResponse(listOfRamos);

  res.json(response);
};

module.exports.postRamo = async (req, res) => {
  const nuevoRamo = await Ramo.create(req.body);

  const response = new CustomResponse(nuevoRamo, 201);

  res.json(response);
};

module.exports.deleteRamo = async (req, res) => {
  const ramo = await Ramo.findByPk(req.params.id);

  if (!ramo) throw new ExpressError("ramo No Encontrado", 404);

  await ramo.destroy();

  const response = new CustomResponse(ramo);

  res.json(response);
};

module.exports.updateRamo = async (req, res) => {
  const ramo = await Ramo.findByPk(req.params.id);

  if (!ramo) throw new ExpressError("ramo No Encontrado", 404);

  ramo.set(req.body);

  const updated = await ramo.save();

  const response = new CustomResponse(updated);

  res.json(response);
};
