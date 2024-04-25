const { Aseguradora } = require("../models");
const CustomResponse = require("../utils/CustomResponse");
const ExpressError = require("../utils/ExpressError");
const {
  validateAseguradora,
  validateGenericId,
} = require("../utils/validator");

module.exports.getAseguradoras = async (req, res) => {
  const listOfAseguradoras = await Aseguradora.findAll();

  const response = new CustomResponse(listOfAseguradoras);

  res.json(response);
};

module.exports.postAseguradora = async (req, res) => {
  const { error, value: aseguradoraObj } = validateAseguradora(req.body);

  if (error) throw new ExpressError(error.details[0].message, 400);

  const newAseguradora = await Aseguradora.create(aseguradoraObj);

  const response = new CustomResponse(newAseguradora);

  res.json(response);
};

module.exports.deleteAseguradora = async (req, res) => {
  const { error, value: aseguradoraId } = validateGenericId(req.params);

  if (error) throw new ExpressError(error.details[0].message, 400);

  const aseguradora = await Aseguradora.findByPk(aseguradoraId.id);

  if (!aseguradora) throw new ExpressError("aseguradora no encontrada", 404);

  await aseguradora.destroy();

  const response = new CustomResponse(aseguradora);

  res.json(response);
};

module.exports.updateAseguradora = async (req, res) => {
  const { error: idError, value: aseguradoraId } = validateGenericId(
    req.params
  );

  if (idError) throw new ExpressError(idError.details[0].message, 400);

  const aseguradoraUpdate = await Aseguradora.findByPk(aseguradoraId.id);

  if (!aseguradoraUpdate)
    throw new ExpressError("aseguradora no encontrada", 404);

  const { error: aseguradoraError, value: aseguradoraData } =
    validateAseguradora(req.body);

  if (aseguradoraError)
    throw new ExpressError(aseguradoraError.details[0].message, 400);

  aseguradoraUpdate.set({
    aseguradoraData,
  });

  const updated = await aseguradoraUpdate.save();

  const response = new CustomResponse(updated);

  res.json(response);
};
