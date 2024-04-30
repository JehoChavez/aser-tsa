const express = require("express");
const router = express.Router();
const catchAsync = require("../../utils/catchAsync");
const ramos = require("../../controllers/ramos");

router
  .route("/")
  .get(catchAsync(ramos.getRamos))
  .post(catchAsync(ramos.postRamo));

router
  .route("/:id")
  .delete(catchAsync(ramos.deleteRamo))
  .put(catchAsync(ramos.updateRamo));

module.exports = router;
