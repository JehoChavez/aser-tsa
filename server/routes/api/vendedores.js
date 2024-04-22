const express = require("express");
const router = express.Router();
const catchAsync = require("../../utils/catchAsync");
const { getVendedores } = require("../../controllers/vendedores");

router.route("/").get(catchAsync(getVendedores));

module.exports = router;
