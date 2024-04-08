const express = require("express");
const router = express.Router();
const { Producto } = require("../../models");

router.get("/", async (req, res) => {
  const listOfProductos = await Producto.findAll({
    attributes: {
      exclude: ["createdAt", "updatedAt"],
    },
  });

  res.json(listOfProductos);
});

router.post("/", async (req, res) => {
  const producto = req.body;

  await Producto.create(producto);

  res.json(producto);
});

router.delete("/:id", async (req, res) => {
  const producto = await Producto.findByPk(req.params.id);

  await producto.destroy();

  res.json({
    message: "Producto eliminado exitosamente",
  });
});

module.exports = router;
