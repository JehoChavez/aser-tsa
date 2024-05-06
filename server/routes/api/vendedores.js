const express = require("express");
const router = express.Router();
const catchAsync = require("../../utils/catchAsync");
const {
  getVendedores,
  postVendedor,
  deleteVendedor,
  updateVendedor,
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
  .delete(validateGenericId, catchAsync(deleteVendedor))
  .put(validateGenericId, validateVendedor, catchAsync(updateVendedor));

module.exports = router;
