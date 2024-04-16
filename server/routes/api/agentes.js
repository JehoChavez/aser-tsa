const express = require("express");
const router = express.Router();
const catchAsync = require("../../utils/catchAsync");
const agentes = require("../../controllers/agentes");

router
  .route("/")
  .get(catchAsync(agentes.getAgentes))
  .post(catchAsync(agentes.postAgente));

router.route("/:agenteId").put(catchAsync(agentes.updateAgente));

module.exports = router;
