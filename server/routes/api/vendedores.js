const express = require("express");
const router = express.Router();
const catchAsync = require("../../utils/catchAsync");
const {
  getVendedores,
  postVendedor,
  deleteVendedor,
} = require("../../controllers/vendedores");

router.route("/").get(catchAsync(getVendedores)).post(catchAsync(postVendedor));

router.route("/:id").delete(catchAsync(deleteVendedor));

module.exports = router;
