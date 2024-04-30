const { Ramo } = require("../models");
const ExpressError = require("../utils/ExpressError");
const CustomResponse = require("../utils/CustomResponse");
const { validateRamo, validateGenericId } = require("../utils/validator");

module.exports.getRamos = async (req, res) => {
  const listOfRamos = await Ramo.findAll();

  const response = new CustomResponse(listOfRamos);

  res.json(response);
};

module.exports.postRamo = async (req, res) => {
  const { error, value } = validateRamo(req.body);

  if (error) throw new ExpressError(error.details[0].message, 400);

  const nuevoRamo = await Ramo.create(value);

  const response = new CustomResponse(nuevoRamo);

  res.json(response);
};

module.exports.deleteRamo = async (req, res) => {
  const { error, value } = validateGenericId(req.params);

  if (error) throw new ExpressError(error.details[0].message, 400);

  const ramo = await Ramo.findByPk(value.id);

  if (!ramo) throw new ExpressError("ramo No Encontrado", 404);

  await ramo.destroy();

  const response = new CustomResponse(ramo);

  res.json(response);
};

module.exports.updateRamo = async (req, res) => {
  const { error: ramoUpdateIdError, value: ramoUpdateId } = validateGenericId(
    req.params
  );

  if (ramoUpdateIdError)
    throw new ExpressError(ramoUpdateIdError.details[0].message, 400);

  const ramo = await Ramo.findByPk(ramoUpdateId.id);

  if (!ramo) throw new ExpressError("ramo No Encontrado", 404);

  const { error: ramoDataError, value: ramoData } = validateRamo(req.body);

  if (ramoDataError)
    throw new ExpressError(ramoDataError.details[0].message, 400);

  ramo.ramo = ramoData.ramo;

  const updated = await ramo.save();

  const response = new CustomResponse(updated);

  res.json(response);
};
