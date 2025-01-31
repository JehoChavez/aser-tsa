const express = require("express");
const router = express.Router();
const catchAsync = require("../../utils/catchAsync");
const {
  getAgente,
  getAgentes,
  postAgente,
  updateAgente,
  deleteAgente,
  uploadAgentes,
} = require("../../controllers/agentes");
const {
  validateIdArray,
  validateAgent,
  validateGenericId,
} = require("../../utils/validator");
const upload = require("../../utils/uploadMiddleware");

router
  .route("/")
  .get(validateIdArray, catchAsync(getAgentes))
  .post(validateAgent, catchAsync(postAgente));

router
  .route("/:id")
  .get(validateGenericId, catchAsync(getAgente))
  .put(validateGenericId, validateAgent, catchAsync(updateAgente))
  .delete(validateGenericId, catchAsync(deleteAgente));

router.post("/upload", upload.single("file"), catchAsync(uploadAgentes));

module.exports = router;
