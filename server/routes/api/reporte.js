const express = require("express");
const router = express.Router();
const catchAsync = require("../../utils/catchAsync");
const { getReporte } = require("../../controllers/reporte");
const { validateReporteQuery } = require("../../utils/validator");

router.route("/").get(validateReporteQuery, catchAsync(getReporte));

module.exports = router;
