const express = require("express");
const router = express.Router();
const catchAsync = require("../../utils/catchAsync");
const { getClientes, getCliente } = require("../../controllers/clientes");

router.route("/").get(catchAsync(getClientes));

router.route("/:id").get(catchAsync(getCliente))

module.exports = router;
