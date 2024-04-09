const express = require("express");
const router = express.Router();
const { Municipio } = require("../../models");
const catchAsync = require("../../utils/catchAsync");

router.get("/", (req, res) => {
  res.status(400);
  res.json({
    error: "ID de estado es necesario",
  });
});

router.get(
  "/:estado",
  catchAsync(async (req, res) => {
    const listOfMunicipios = await Municipio.findAll({
      where: {
        estadoId: req.params.estado,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
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
  })
);

module.exports = router;
