const express = require("express");
const router = express.Router();
const catchAsync = require("../../utils/catchAsync");
const estados = require("../../controllers/estados");

router.route("/").get(catchAsync(estados.getEstados));

module.exports = router;
