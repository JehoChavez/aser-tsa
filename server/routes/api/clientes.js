const express = require("express");
const router = express.Router();
const catchAsync = require("../../utils/catchAsync");
const { getClientes } = require("../../controllers/clientes");

router.route("/").get(catchAsync(getClientes));

module.exports = router;
