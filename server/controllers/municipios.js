const { Municipio } = require("../models");
const ExpressError = require("../utils/ExpressError");
const CustomResponse = require("../utils/CustomResponse");

module.exports.getMunicipio = async (req, res) => {
  if (!req.body.estado) {
    throw new ExpressError("ID de estado es necesario", 400);
  } else {
    const listOfMunicipios = await Municipio.findAll({
      where: {
        estadoId: req.body.estado,
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
  }
};
