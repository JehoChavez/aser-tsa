const express = require("express");
const router = express.Router();
const { Municipio } = require("../../models");
const catchAsync = require("../../utils/catchAsync");
const ExpressError = require("../../utils/ExpressError");

router.get("/", (req, res) => {
  throw new ExpressError("ID de estado es necesario", 400);
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
      throw new ExpressError("ID de estado no es válido (1-32)", 400);
    } else {
      res.json(listOfMunicipios);
    }
  })
);

module.exports = router;
