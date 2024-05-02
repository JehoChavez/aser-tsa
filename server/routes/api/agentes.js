const express = require("express");
const router = express.Router();
const catchAsync = require("../../utils/catchAsync");
const agentes = require("../../controllers/agentes");
const {
  validateIdArray,
  validateAgent,
  validateGenericId,
} = require("../../utils/validator");

router
  .route("/")
  .get(validateIdArray, catchAsync(agentes.getAgentes))
  .post(validateAgent, catchAsync(agentes.postAgente));

router
  .route("/:id")
  .put(validateGenericId, validateAgent, catchAsync(agentes.updateAgente));

module.exports = router;
