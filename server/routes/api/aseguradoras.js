const express = require("express");
const router = express.Router();
const catchAsync = require("../../utils/catchAsync");
const {
  getAseguradora,
  getAseguradoras,
  postAseguradora,
  updateAseguradora,
  deleteAseguradora,
  uploadAseguradoras,
} = require("../../controllers/aseguradoras");
const {
  validateGenericId,
  validateAseguradora,
} = require("../../utils/validator");
const upload = require("../../utils/uploadMiddleware");

router
  .route("/")
  .get(catchAsync(getAseguradoras))
  .post(validateAseguradora, catchAsync(postAseguradora));

router
  .route("/:id")
  .get(validateGenericId, catchAsync(getAseguradora))
  .delete(validateGenericId, catchAsync(deleteAseguradora))
  .put(validateGenericId, validateAseguradora, catchAsync(updateAseguradora));

router.post("/upload", upload.single("file"), catchAsync(uploadAseguradoras));

module.exports = router;
