const express = require("express");
const router = express.Router();
const catchAsync = require("../../utils/catchAsync");
const aseguradoras = require("../../controllers/aseguradoras");

router
  .route("/")
  .get(catchAsync(aseguradoras.getAseguradoras))
  .post(catchAsync(aseguradoras.postAseguradora));

router.route("/:id").delete(catchAsync(aseguradoras.deleteAseguradora));
module.exports = router;
