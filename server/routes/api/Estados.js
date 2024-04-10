const express = require("express");
const router = express.Router();
const { Estado } = require("../../models");
const catchAsync = require("../../utils/catchAsync");

router.get(
  "/",
  catchAsync(async (req, res) => {
    const listOfEstados = await Estado.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    const response = {
      status: "Success",
      code: 200,
      data: listOfEstados,
    };

    res.json(response);
  })
);

module.exports = router;
