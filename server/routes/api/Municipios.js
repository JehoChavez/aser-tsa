const express = require("express");
const router = express.Router();
const { Municipio } = require("../../models");

router.get("/", (req, res) => {
  res.status(400);
  res.json({
    error: "ID de estado es necesario",
  });
});

router.get("/:estado", async (req, res) => {
  const listOfMunicipios = await Municipio.findAll({
    where: {
      estadoId: req.params.estado,
    },
  });

  if (!listOfMunicipios[0]) {
    res.status(400);
    res.json({
      error: "ID de estado no es válido",
    });
  } else {
    res.json(listOfMunicipios);
  }
});

module.exports = router;
