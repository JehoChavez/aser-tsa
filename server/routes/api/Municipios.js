const express = require("express");
const router = express.Router();
const catchAsync = require("../../utils/catchAsync");
const municipios = require("../../controllers/municipios");

router.route("/").get(municipios.noId);

router.route("/:estado").get(catchAsync(municipios.getMunicipio));

module.exports = router;
