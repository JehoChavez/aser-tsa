const express = require("express");
const router = express.Router();
const catchAsync = require("../../utils/catchAsync");
const {
  getVendedores,
  postVendedor,
  deleteVendedor,
  updateVendedor,
  getVendedor,
} = require("../../controllers/vendedores");
const {
  validateVendedor,
  validateGenericId,
} = require("../../utils/validator");

router
  .route("/")
  .get(catchAsync(getVendedores))
  .post(validateVendedor, catchAsync(postVendedor));

router
  .route("/:id")
  .get(validateGenericId, catchAsync(getVendedor))
  .delete(validateGenericId, catchAsync(deleteVendedor))
  .put(validateGenericId, validateVendedor, catchAsync(updateVendedor));

module.exports = router;
