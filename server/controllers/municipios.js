const { Municipio } = require("../models");
const ExpressError = require("../utils/ExpressError");
const CustomResponse = require("../utils/CustomResponse");

module.exports.getMunicipio = async (req, res) => {
  const { estado } = req.query;

  if (!estado) throw new ExpressError("Estado es necesario", 400);

  const listOfMunicipios = await Municipio.findAll({
    where: {
      estadoId: estado,
    },
    attributes: {
      exclude: ["createdAt", "updatedAt"],
    },
  });

  if (!listOfMunicipios[0]) {
    throw new ExpressError("ID de estado no es válido (1-32)", 400);
  } else {
    const response = new CustomResponse(listOfMunicipios);

    res.json(response);
  }
};
