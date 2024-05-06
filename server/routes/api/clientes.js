const express = require("express");
const router = express.Router();
const catchAsync = require("../../utils/catchAsync");
const {
  getClientes,
  getCliente,
  postCliente,
  deleteCliente,
  updateCliente,
} = require("../../controllers/clientes");
const { validateGenericId, validateCliente } = require("../../utils/validator");

router
  .route("/")
  .get(catchAsync(getClientes))
  .post(validateCliente, catchAsync(postCliente));

router
  .route("/:id")
  .get(validateGenericId, catchAsync(getCliente))
  .delete(validateGenericId, catchAsync(deleteCliente))
  .put(validateGenericId, validateCliente, catchAsync(updateCliente));

module.exports = router;
