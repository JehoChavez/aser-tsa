const express = require("express");
const router = express.Router();
const catchAsync = require("../../utils/catchAsync");
const {
  getPolizas,
  postPoliza,
  getPoliza,
} = require("../../controllers/polizas");

router.route("/").get(catchAsync(getPolizas)).post(catchAsync(postPoliza));

router.route("/:id").get(catchAsync(getPoliza));

module.exports = router;
