const express = require("express");
const router = express.Router();
const catchAsync = require("../../utils/catchAsync");
const { getEndoso } = require("../../controllers/endosos");
const { validateGenericId } = require("../../utils/validator");

router.route("/:id").get(validateGenericId, catchAsync(getEndoso));

module.exports = router;
