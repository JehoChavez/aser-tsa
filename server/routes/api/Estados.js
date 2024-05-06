const express = require("express");
const router = express.Router();
const catchAsync = require("../../utils/catchAsync");
const {
  getEstados,
  getEstado,
  getMunicipios,
  getMunicipio,
} = require("../../controllers/estados");
const {
  validateGenericId,
  validateEstadoMunicipioId,
} = require("../../utils/validator");

router.route("/").get(catchAsync(getEstados));

router.route("/:id").get(validateGenericId, catchAsync(getEstado));

router
  .route("/:id/municipios")
  .get(validateGenericId, catchAsync(getMunicipios));

router
  .route("/:id/municipios/:municipioId")
  .get(validateEstadoMunicipioId, catchAsync(getMunicipio));

module.exports = router;
