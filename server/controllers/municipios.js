const { Municipio } = require("../models");
const ExpressError = require("../utils/ExpressError");
const CustomResponse = require("../utils/CustomResponse");

module.exports.noId = (req, res) => {
  throw new ExpressError("ID de estado es necesario", 400);
};

module.exports.getMunicipio = async (req, res) => {
  const { estadoId } = req.params;
  const listOfMunicipios = await Municipio.findAll({
    where: {
      estadoId: estadoId,
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
