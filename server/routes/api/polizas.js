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
  cambiarContratante,
  cancelarPoliza,
  anularCancelacion,
  uploadPolizas,
} = require("../../controllers/polizas");
const { getPolizaRecibos } = require("../../controllers/recibos");
const { getEndosos } = require("../../controllers/endosos");
const { verifyPolizaAssociations } = require("../../utils/verifyAssociations");
const {
  validatePoliza,
  validateGenericId,
  validatePolizasQuery,
  validateClienteId,
  validateCancelacion,
} = require("../../utils/validator");

const upload = require("../../utils/uploadMiddleware");

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

router
  .route("/:id/cambiar-contratante")
  .patch(validateGenericId, validateClienteId, catchAsync(cambiarContratante));

router
  .route("/:id/cancelar")
  .patch(validateGenericId, validateCancelacion, catchAsync(cancelarPoliza));

router
  .route("/:id/anular-cancelacion")
  .patch(validateGenericId, catchAsync(anularCancelacion));

router.post("/upload", upload.single("file"), catchAsync(uploadPolizas));

module.exports = router;
