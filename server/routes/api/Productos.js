const express = require("express");
const router = express.Router();
const { Producto } = require("../../models");
const catchAsync = require("../../utils/catchAsync");
const ExpressError = require("../../utils/ExpressError");
const CustomResponse = require("../../utils/CustomResponse");
const productos = require("../../controllers/productos");

router
  .route("/")
  .get(catchAsync(productos.getProductos))
  .post(productos.postProducto);

router.route("/:id").delete(catchAsync(productos.deleteProducto));

module.exports = router;
