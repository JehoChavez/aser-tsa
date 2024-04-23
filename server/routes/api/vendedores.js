const express = require("express");
const router = express.Router();
const catchAsync = require("../../utils/catchAsync");
const {
  getVendedores,
  postVendedor,
  deleteVendedor,
  updateVendedor,
} = require("../../controllers/vendedores");

router.route("/").get(catchAsync(getVendedores)).post(catchAsync(postVendedor));

router
  .route("/:id")
  .delete(catchAsync(deleteVendedor))
  .put(catchAsync(updateVendedor));

module.exports = router;
