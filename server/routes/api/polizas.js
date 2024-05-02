const express = require("express");
const router = express.Router();
const catchAsync = require("../../utils/catchAsync");
const catchAsyncMiddleware = require("../../utils/catchAsyncMiddleware");
const {
  getPolizas,
  postPoliza,
  getPoliza,
  updatePoliza,
  deletePoliza,
} = require("../../controllers/polizas");
const { verifyPolizaAssociations } = require("../../utils/verifyAssociations");
const {
  validatePoliza,
  validateGenericId,
  validateQueryPolizas,
} = require("../../utils/validator");

router
  .route("/")
  .get(validateQueryPolizas, catchAsync(getPolizas))
  .post(
    validatePoliza,
    catchAsyncMiddleware(verifyPolizaAssociations),
    catchAsync(postPoliza)
  );

router
  .route("/:id")
  .get(validateGenericId, catchAsync(getPoliza))
  .put(
    validateGenericId,
    validatePoliza,
    catchAsyncMiddleware(verifyPolizaAssociations),
    catchAsync(updatePoliza)
  )
  .delete(validateGenericId, catchAsync(deletePoliza));

module.exports = router;
