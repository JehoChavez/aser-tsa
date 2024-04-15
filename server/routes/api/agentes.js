const express = require("express");
const router = express.Router();
const catchAsync = require("../../utils/catchAsync");
const agentes = require("../../controllers/agentes");

router.route("/").get(agentes.getAgentes);

module.exports = router;
