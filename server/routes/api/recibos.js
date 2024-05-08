const express = require("express");
const router = express.Router();
const { getRecibos } = require("../../controllers/recibos");
const catchAsync = require("../../utils/catchAsync");
const { validateReciboQuery } = require("../../utils/validator");

router.route("/").get(validateReciboQuery, catchAsync(getRecibos));

module.exports = router;
