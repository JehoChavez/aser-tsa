const express = require("express");
const router = express.Router();
const catchAsync = require("../../utils/catchAsync");
const {
  getEndoso,
  postEndoso,
  deleteEndoso,
  updateEndoso,
} = require("../../controllers/endosos");
import { getEndosoRecibos } from "../../controllers/recibos";
const { validateGenericId, validateEndoso } = require("../../utils/validator");

router.route("/").post(validateEndoso, catchAsync(postEndoso));

router
  .route("/:id")
  .get(validateGenericId, catchAsync(getEndoso))
  .delete(validateGenericId, catchAsync(deleteEndoso))
  .put(validateGenericId, validateEndoso, catchAsync(updateEndoso));

router
  .route("/:id/recibos")
  .get(validateGenericId, catchAsync(getEndosoRecibos));

module.exports = router;
