// Some functions are imported in polizas router
// Polizas controller already has a lot of code
const { Endoso } = require("../models");
const CustomResponse = require("../utils/CustomResponse");
const ExpressError = require("../utils/ExpressError");

module.exports.getEndosos = async (req, res) => {
  const listOfEndosos = await Endoso.findAll({
    where: {
      polizaId: req.params.id,
    },
  });

  const response = new CustomResponse(listOfEndosos);

  res.json(response);
};

module.exports.getEndoso = async (req, res) => {
  const endoso = await Endoso.findByPk(req.params.id);

  if (!endoso) throw new ExpressError("endoso no encontrado", 404);

  const response = new CustomResponse(endoso);

  res.json(response);
};
