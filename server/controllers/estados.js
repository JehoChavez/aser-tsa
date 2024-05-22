const { Estado, Municipio } = require("../models");
const CustomResponse = require("../utils/CustomResponse");
const ExpressError = require("../utils/ExpressError");

module.exports.getEstados = async (req, res) => {
  const listOfEstados = await Estado.findAll();

  const response = new CustomResponse(listOfEstados);

  res.status(response.status).json(response);
};

module.exports.getEstado = async (req, res) => {
  const estado = await Estado.findByPk(req.params.id);

  if (!estado) throw new ExpressError("estado no encontrado", 404);

  const response = new CustomResponse(estado);

  res.status(response.status).json(response);
};

module.exports.getMunicipios = async (req, res) => {
  const estado = await Estado.findByPk(req.params.id);

  if (!estado) throw new ExpressError("estado no encontrado", 404);

  const listOfMunicipios = await Municipio.findAll({
    where: {
      estadoId: req.params.id,
    },
  });

  if (!listOfMunicipios[0])
    throw new ExpressError("municipios no encontrados", 404);

  const response = new CustomResponse(listOfMunicipios);

  res.status(response.status).json(response);
};

module.exports.getMunicipio = async (req, res) => {
  const estado = await Estado.findByPk(req.params.id);

  if (!estado) throw new ExpressError("estado no encontrado", 404);

  const municipio = await Municipio.findByPk(req.params.municipioId);

  if (!municipio) throw new ExpressError("municipio no encontrado", 404);

  const response = new CustomResponse(municipio);

  res.status(response.status).json(response);
};
