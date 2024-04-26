const { Vendedor } = require("../models");
const ExpressError = require("../utils/ExpressError");
const CustomResponse = require("../utils/CustomResponse");
const { validateVendedor, validateGenericId } = require("../utils/validator");

module.exports.getVendedores = async (req, res) => {
  const listOfVendedores = await Vendedor.findAll();

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

module.exports.deleteVendedor = async (req, res) => {
  const { error, value } = validateGenericId(req.params);

  if (error) throw new ExpressError(error.details[0].message, 400);

  const vendedor = await Vendedor.findByPk(value.id);

  if (!vendedor) throw new ExpressError("Vendedor no encontrado", 404);

  await vendedor.destroy();

  const response = new CustomResponse(vendedor);

  res.json(response);
};

module.exports.updateVendedor = async (req, res) => {
  const { error: idError, value: idData } = validateGenericId(req.params);

  if (idError) throw new ExpressError(idError.details[0].message, 400);

  const vendedor = await Vendedor.findByPk(idData.id);

  if (!vendedor) throw new ExpressError("Vendedor no encontrado", 404);

  const { error: vendedorError, value: vendedorData } = validateVendedor(
    req.body
  );

  if (vendedorError)
    throw new ExpressError(vendedorError.details[0].message, 400);

  vendedor.set({ vendedorData });

  const updated = await vendedor.save();

  const response = new CustomResponse(updated);

  res.json(response);
};
