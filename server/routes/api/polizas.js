const express = require("express");
const router = express.Router();
const catchAsync = require("../../utils/catchAsync");
const { getPolizas, postPoliza } = require("../../controllers/polizas");

router.route("/").get(catchAsync(getPolizas)).post(catchAsync(postPoliza));

module.exports = router;
