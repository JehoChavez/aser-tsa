const { Vendedor } = require("../models");
const ExpressError = require("../utils/ExpressError");
const CustomResponse = require("../utils/CustomResponse");
const { validateVendedor } = require("../utils/validator");

module.exports.getVendedores = async (req, res) => {
  const listOfVendedores = await Vendedor.findAll();

  if (!listOfVendedores[0])
    throw new ExpressError("Vendedores no encontrados", 404);

  const response = new CustomResponse(listOfVendedores);

  res.json(response);
};

module.exports.postVendedor = async (req, res) => {
  const { error, value } = validateVendedor(req.body);

  if (error) throw new ExpressError(error.details[0].message, 400);

  const nuevoVendedor = await Vendedor.create(value);

  const response = new CustomResponse(nuevoVendedor);

  res.json(response);
};
