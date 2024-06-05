const express = require("express");
const router = express.Router();
const catchAsync = require("../../utils/catchAsync");
const { getPendientes } = require("../../controllers/pendientes");
const { validatePendientesQuery } = require("../../utils/validator");

router.route("/").get(validatePendientesQuery, catchAsync(getPendientes));

module.exports = router;
