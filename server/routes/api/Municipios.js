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
      const response = {
        status: "Success",
        code: 200,
        data: listOfMunicipios,
      };

      res.json(response);
    }
  })
);

module.exports = router;
