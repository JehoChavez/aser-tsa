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
  reexpedirPoliza,
  renovarPoliza,
} = require("../../controllers/polizas");
const { getPolizaRecibos } = require("../../controllers/recibos");
const { getEndosos } = require("../../controllers/endosos");
const { verifyPolizaAssociations } = require("../../utils/verifyAssociations");
const {
  validatePoliza,
  validateGenericId,
  validatePolizasQuery,
} = require("../../utils/validator");

router
  .route("/")
  .get(validatePolizasQuery, catchAsync(getPolizas))
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

router.route("/:id/endosos").get(validateGenericId, catchAsync(getEndosos));

router
  .route("/:id/recibos")
  .get(validateGenericId, catchAsync(getPolizaRecibos));

router
  .route("/:id/reexpedir")
  .post(validateGenericId, validatePoliza, catchAsync(reexpedirPoliza));

router
  .route("/:id/renovar")
  .post(validateGenericId, validatePoliza, catchAsync(renovarPoliza));

module.exports = router;
