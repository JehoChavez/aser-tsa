const express = require("express");
const router = express.Router();
const { getRecibos } = require("../../controllers/recibos");
const catchAsync = require("../../utils/catchAsync");
const { validateRecibosQuery } = require("../../utils/validator");

router.route("/").get(validateRecibosQuery, catchAsync(getRecibos));

module.exports = router;
