const express = require("express");
const router = express.Router();
const catchAsync = require("../../utils/catchAsync");
const {
  getRamos,
  postRamo,
  deleteRamo,
  updateRamo,
  getRamo,
} = require("../../controllers/ramos");
const { validateRamo, validateGenericId } = require("../../utils/validator");

router
  .route("/")
  .get(catchAsync(getRamos))
  .post(validateRamo, catchAsync(postRamo));

router
  .route("/:id")
  .get(validateGenericId, catchAsync(getRamo))
  .delete(validateGenericId, catchAsync(deleteRamo))
  .put(validateGenericId, validateRamo, catchAsync(updateRamo));

module.exports = router;
