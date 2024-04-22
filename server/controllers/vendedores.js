const { Vendedor } = require("../models");
const ExpressError = require("../utils/ExpressError");
const CustomResponse = require("../utils/CustomResponse");

module.exports.getVendedores = async (req, res) => {
  const listOfVendedores = await Vendedor.findAll();

  if (!listOfVendedores[0])
    throw new ExpressError("Vendedores no encontrados", 404);

  const response = new CustomResponse(listOfVendedores);

  res.json(response);
};
