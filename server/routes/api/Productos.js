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

module.exports = router;
