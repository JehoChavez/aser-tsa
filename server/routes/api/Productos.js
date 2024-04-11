const express = require("express");
const router = express.Router();
const catchAsync = require("../../utils/catchAsync");
const productos = require("../../controllers/productos");

router
  .route("/")
  .get(catchAsync(productos.getProductos))
  .post(productos.postProducto);

router.route("/:id").delete(catchAsync(productos.deleteProducto));

module.exports = router;
