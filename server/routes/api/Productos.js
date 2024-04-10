const express = require("express");
const router = express.Router();
const { Producto } = require("../../models");
const catchAsync = require("../../utils/catchAsync");
const ExpressError = require("../../utils/ExpressError");

router.get(
  "/",
  catchAsync(async (req, res) => {
    const listOfProductos = await Producto.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    const response = {
      status: "Success",
      code: 200,
      data: {
        productos: listOfProductos,
      },
    };

    res.json(response);
  })
);

router.post(
  "/",
  catchAsync(async (req, res) => {
    const producto = req.body;

    const nuevoProducto = await Producto.create(producto);

    const response = {
      status: "Success",
      code: 200,
      data: {
        id: nuevoProducto.id,
        producto: nuevoProducto.producto,
        createdAt: nuevoProducto.createdAt,
      },
    };

    res.json(response);
  })
);

router.delete(
  "/:id",
  catchAsync(async (req, res) => {
    const producto = await Producto.findByPk(req.params.id);

    if (!producto) throw new ExpressError("Producto No Encontrado", 404);

    await producto.destroy();

    const response = {
      status: "Success",
      code: 200,
      data: {
        message: "Producto eliminado exitosamente",
      },
    };

    res.json(response);
  })
);

module.exports = router;
