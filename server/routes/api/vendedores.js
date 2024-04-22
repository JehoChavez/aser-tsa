const express = require("express");
const router = express.Router();
const catchAsync = require("../../utils/catchAsync");
const { getVendedores, postVendedor } = require("../../controllers/vendedores");

router.route("/").get(catchAsync(getVendedores)).post(catchAsync(postVendedor));

module.exports = router;
