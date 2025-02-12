const express = require("express");
const router = express.Router();
const catchAsync = require("../../utils/catchAsync");
const {
  getClientes,
  getCliente,
  postCliente,
  deleteCliente,
  updateCliente,
  uploadClientes,
} = require("../../controllers/clientes");
const {
  validateGenericId,
  validateCliente,
  validateClienteQuery,
} = require("../../utils/validator");
const upload = require("../../utils/uploadMiddleware");

router
  .route("/")
  .get(validateClienteQuery, catchAsync(getClientes))
  .post(validateCliente, catchAsync(postCliente));

router
  .route("/:id")
  .get(validateGenericId, catchAsync(getCliente))
  .delete(validateGenericId, catchAsync(deleteCliente))
  .put(validateGenericId, validateCliente, catchAsync(updateCliente));

router.post("/upload", upload.single("file"), catchAsync(uploadClientes));

module.exports = router;
