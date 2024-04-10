const express = require("express");
const router = express.Router();
const { Estado } = require("../../models");
const catchAsync = require("../../utils/catchAsync");
const CustomResponse = require("../../utils/CustomResponse");

router.get(
  "/",
  catchAsync(async (req, res) => {
    const listOfEstados = await Estado.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    const response = new CustomResponse(listOfEstados);

    res.json(response);
  })
);

module.exports = router;
