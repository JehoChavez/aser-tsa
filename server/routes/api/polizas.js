const express = require("express");
const router = express.Router();
const catchAsync = require("../../utils/catchAsync");
const catchAsyncMiddleware = require("../../utils/catchAsyncMiddleware");
const {
  getPolizas,
  postPoliza,
  getPoliza,
  updatePoliza,
} = require("../../controllers/polizas");
const { verifyPolizaAssociations } = require("../../utils/verifyAssociations");

router
  .route("/")
  .get(catchAsync(getPolizas))
  .post(catchAsyncMiddleware(verifyPolizaAssociations), catchAsync(postPoliza));

router
  .route("/:id")
  .get(catchAsync(getPoliza))
  .put(
    catchAsyncMiddleware(verifyPolizaAssociations),
    catchAsync(updatePoliza)
  );

module.exports = router;
