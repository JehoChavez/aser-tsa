const express = require("express");
const router = express.Router();
const catchAsync = require("../../utils/catchAsync");
const aseguradoras = require("../../controllers/aseguradoras");
const {
  validateGenericId,
  validateAseguradora,
} = require("../../utils/validator");

router
  .route("/")
  .get(catchAsync(aseguradoras.getAseguradoras))
  .post(validateAseguradora, catchAsync(aseguradoras.postAseguradora));

router
  .route("/:id")
  .delete(validateGenericId, catchAsync(aseguradoras.deleteAseguradora))
  .put(
    validateGenericId,
    validateAseguradora,
    catchAsync(aseguradoras.updateAseguradora)
  );
module.exports = router;
