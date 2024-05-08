const express = require("express");
const router = express.Router();
const catchAsync = require("../../utils/catchAsync");
const {
  getEndoso,
  postEndoso,
  deleteEndoso,
} = require("../../controllers/endosos");
const { validateGenericId, validateEndoso } = require("../../utils/validator");

router.route("/").post(validateEndoso, catchAsync(postEndoso));

router
  .route("/:id")
  .get(validateGenericId, catchAsync(getEndoso))
  .delete(validateGenericId, catchAsync(deleteEndoso));

module.exports = router;
