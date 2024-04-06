const express = require("express");
const router = express.Router();
const { Estado } = require("../../models");

router.get("/", async (req, res) => {
  const listOfEstados = await Estado.findAll({
    attributes: {
      exclude: ["createdAt", "updatedAt"],
    },
  });

  res.json(listOfEstados);
});

module.exports = router;
