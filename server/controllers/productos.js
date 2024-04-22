const { Producto } = require("../models");
const ExpressError = require("../utils/ExpressError");
const CustomResponse = require("../utils/CustomResponse");
const { validateProducto, validateGenericId } = require("../utils/validator");

module.exports.getProductos = async (req, res) => {
  const listOfProductos = await Producto.findAll();

  const response = new CustomResponse({ productos: listOfProductos });

  res.json(response);
};

module.exports.postProducto = async (req, res) => {
  const { error, value } = validateProducto(req.body);

  if (error) throw new ExpressError(error.details[0].message, 400);

  const nuevoProducto = await Producto.create(value);

  const response = new CustomResponse(nuevoProducto);

  res.json(response);
};

module.exports.deleteProducto = async (req, res) => {
  const { error, value } = validateGenericId(req.params);

  if (error) throw new ExpressError(error.details[0].message, 400);

  const producto = await Producto.findByPk(value.id);

  if (!producto) throw new ExpressError("Producto No Encontrado", 404);

  await producto.destroy();

  const response = new CustomResponse(producto);

  res.json(response);
};

module.exports.updateProducto = async (req, res) => {
  const { error: productoDataError, value: productoData } = validateProducto(
    req.body
  );

  if (productoDataError)
    throw new ExpressError(productoDataError.details[0].message, 400);

  const { error: productoUpdateIdError, value: productoUpdateId } =
    validateGenericId(req.params);

  if (productoUpdateIdError)
    throw new ExpressError(productoUpdateIdError.details[0].message, 400);

  const producto = await Producto.findByPk(productoUpdateId.id);

  if (!producto) throw new ExpressError("Producto No Encontrado", 404);

  producto.producto = productoData.producto;

  const updated = await producto.save();

  const response = new CustomResponse(updated);

  res.json(response);
};
