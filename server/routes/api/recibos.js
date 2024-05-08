const express = require("express");
const router = express.Router();
const { getRecibos } = require("../../controllers/recibos");
const catchAsync = require("../../utils/catchAsync");

router.route("/").get(catchAsync(getRecibos));

module.exports = router;
