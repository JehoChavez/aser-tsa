const { Aseguradora } = require("../models");
const CustomResponse = require("../utils/CustomResponse");
const ExpressError = require("../utils/ExpressError");

module.exports.getAseguradoras = async (req, res) => {
  const listOfAseguradoras = await Aseguradora.findAll();

  const response = new CustomResponse(listOfAseguradoras);

  res.json(response);
};

module.exports.postAseguradora = async (req, res) => {
  const { aseguradora, plazoPrimer, plazoSubsecuentes, comentarios } = req.body;
  const aseguradoraObj = {
    aseguradora,
    plazoPrimer,
    plazoSubsecuentes,
    comentarios,
  };

  const newAseguradora = await Aseguradora.create(aseguradoraObj);

  const response = new CustomResponse(newAseguradora);

  res.json(response);
};

module.exports.deleteProducto = async (req, res) => {
  const aseguradora = await Aseguradora.findByPk(req.params.id);

  if (!aseguradora) throw new ExpressError("aseguradora no encontrada", 404);

  await aseguradora.destroy();

  const response = new CustomResponse(aseguradora);

  res.json(response);
};
