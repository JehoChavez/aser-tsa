const express = require("express");
const router = express.Router();
const catchAsync = require("../../utils/catchAsync");
const { getMunicipio } = require("../../controllers/municipios");
const { validateEstadoId } = require("../../utils/validator");

router.route("/").get(validateEstadoId, catchAsync(getMunicipio));

module.exports = router;
