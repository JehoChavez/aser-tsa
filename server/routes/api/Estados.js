const express = require("express");
const router = express.Router();
const { Estado } = require("../../models");

router.get("/", async (req, res) => {
  console.log(Estado);
  const listOfEstados = await Estado.findAll();

  res.json(listOfEstados);
});

module.exports = router;
