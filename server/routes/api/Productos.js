const express = require("express");
const router = express.Router();
const { Producto } = require("../../models");
const catchAsync = require("../../utils/catchAsync");
const ExpressError = require("../../utils/ExpressError");
const CustomResponse = require("../../utils/CustomResponse");

router.get(
  "/",
  catchAsync(async (req, res) => {
    const listOfProductos = await Producto.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    const response = new CustomResponse({ productos: listOfProductos });

    res.json(response);
  })
);

router.post(
  "/",
  catchAsync(async (req, res) => {
    const producto = req.body;

    const nuevoProducto = await Producto.create(producto);

    const data = {
      id: nuevoProducto.id,
      producto: nuevoProducto.producto,
      createdAt: nuevoProducto.createdAt,
    };

    const response = new CustomResponse(data);

    res.json(response);
  })
);

router.delete(
  "/:id",
  catchAsync(async (req, res) => {
    const producto = await Producto.findByPk(req.params.id);

    if (!producto) throw new ExpressError("Producto No Encontrado", 404);

    await producto.destroy();

    const data = {
      message: "Producto eliminado exitosamente",
    };

    const response = CustomResponse(data);

    res.json(response);
  })
);

module.exports = router;
