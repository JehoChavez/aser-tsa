const express = require("express");
const router = express.Router();
const catchAsync = require("../../utils/catchAsync");
const {
  getEndoso,
  postEndoso,
  deleteEndoso,
  updateEndoso,
  uploadEndosos,
} = require("../../controllers/endosos");
const { getEndosoRecibos } = require("../../controllers/recibos");
const { validateGenericId, validateEndoso } = require("../../utils/validator");
const upload = require("../../utils/uploadMiddleware");

router.route("/").post(validateEndoso, catchAsync(postEndoso));

router
  .route("/:id")
  .get(validateGenericId, catchAsync(getEndoso))
  .delete(validateGenericId, catchAsync(deleteEndoso))
  .put(validateGenericId, validateEndoso, catchAsync(updateEndoso));

router
  .route("/:id/recibos")
  .get(validateGenericId, catchAsync(getEndosoRecibos));

router.post("/upload", upload.single("file"), catchAsync(uploadEndosos));

module.exports = router;
