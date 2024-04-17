const { Municipio } = require("../models");
const ExpressError = require("../utils/ExpressError");
const CustomResponse = require("../utils/CustomResponse");
const { validateEstadoId } = require("../utils/validator");

module.exports.getMunicipio = async (req, res) => {
  const { error, value } = validateEstadoId(req.query);

  if (error) {
    throw new ExpressError(error.details[0].message, 500);
  }

  const listOfMunicipios = await Municipio.findAll({
    where: {
      estadoId: value.estado,
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
