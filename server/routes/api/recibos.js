const express = require("express");
const router = express.Router();
const {
  getRecibos,
  pagarRecibo,
  anularPago,
} = require("../../controllers/recibos");
const catchAsync = require("../../utils/catchAsync");
const {
  validateRecibosQuery,
  validateGenericId,
  validatePago,
} = require("../../utils/validator");

router.route("/").get(validateRecibosQuery, catchAsync(getRecibos));

router
  .route("/:id/pagar")
  .patch(validateGenericId, validatePago, catchAsync(pagarRecibo));

router
  .route("/:id/anularPago")
  .patch(validateGenericId, catchAsync(anularPago));

module.exports = router;
