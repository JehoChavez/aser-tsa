const express = require("express");
const router = express.Router();
const catchAsync = require("../../utils/catchAsync");
const catchAsyncMiddleware = require("../../utils/catchAsyncMiddleware");
const {
  getPolizas,
  postPoliza,
  getPoliza,
} = require("../../controllers/polizas");
const { verifyPolizaAssociations } = require("../../utils/verifyAssociations");

router
  .route("/")
  .get(catchAsync(getPolizas))
  .post(catchAsyncMiddleware(verifyPolizaAssociations), catchAsync(postPoliza));

router.route("/:id").get(catchAsync(getPoliza));

module.exports = router;
