const express = require("express");
const router = express.Router();
const catchAsync = require("../../utils/catchAsync");
const {
  getAseguradora,
  getAseguradoras,
  postAseguradora,
  updateAseguradora,
  deleteAseguradora,
} = require("../../controllers/aseguradoras");
const {
  validateGenericId,
  validateAseguradora,
} = require("../../utils/validator");

router
  .route("/")
  .get(catchAsync(getAseguradoras))
  .post(validateAseguradora, catchAsync(postAseguradora));

router
  .route("/:id")
  .get(validateGenericId, catchAsync(getAseguradora))
  .delete(validateGenericId, catchAsync(deleteAseguradora))
  .put(validateGenericId, validateAseguradora, catchAsync(updateAseguradora));
module.exports = router;
