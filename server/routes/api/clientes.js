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

router.route("/").get(catchAsync(getClientes)).post(catchAsync(postCliente));

router
  .route("/:id")
  .get(catchAsync(getCliente))
  .delete(catchAsync(deleteCliente))
  .put(catchAsync(updateCliente));

module.exports = router;
