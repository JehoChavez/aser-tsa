const express = require("express");
const router = express.Router();
const catchAsync = require("../../utils/catchAsync");
const {
  getAgente,
  getAgentes,
  postAgente,
  updateAgente,
} = require("../../controllers/agentes");
const {
  validateIdArray,
  validateAgent,
  validateGenericId,
} = require("../../utils/validator");

router
  .route("/")
  .get(validateIdArray, catchAsync(getAgentes))
  .post(validateAgent, catchAsync(postAgente));

router
  .route("/:id")
  .get(validateGenericId, catchAsync(getAgente))
  .put(validateGenericId, validateAgent, catchAsync(updateAgente));

module.exports = router;
