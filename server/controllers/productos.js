const { Producto } = require("../models");
const ExpressError = require("../utils/ExpressError");
const CustomResponse = require("../utils/CustomResponse");

module.exports.getProductos = async (req, res) => {
  const listOfProductos = await Producto.findAll({
    attributes: {
      exclude: ["createdAt", "updatedAt"],
    },
  });

  const response = new CustomResponse({ productos: listOfProductos });

  res.json(response);
};

module.exports.postProducto = async (req, res) => {
  const producto = req.body;

  const nuevoProducto = await Producto.create(producto);

  const data = {
    id: nuevoProducto.id,
    producto: nuevoProducto.producto,
    createdAt: nuevoProducto.createdAt,
  };

  const response = new CustomResponse(data);

  res.json(response);
};

module.exports.deleteProducto = async (req, res) => {
  const producto = await Producto.findByPk(req.params.id);

  if (!producto) throw new ExpressError("Producto No Encontrado", 404);

  await producto.destroy();

  const data = {
    message: "Producto eliminado exitosamente",
  };

  const response = new CustomResponse(data);

  res.json(response);
};