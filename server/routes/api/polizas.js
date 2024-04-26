const express = require("express");
const router = express.Router();
const catchAsync = require("../../utils/catchAsync");
const { getPolizas } = require("../../controllers/polizas");

router.route("/").get(catchAsync(getPolizas));

module.exports = router;
