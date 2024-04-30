const {
  Poliza,
  Cliente,
  Aseguradora,
  Agente,
  Vendedor,
  Producto,
} = require("../models");
const CustomResponse = require("../utils/CustomResponse");
const ExpressError = require("../utils/ExpressError");
const { validatePoliza } = require("../utils/validator");

module.exports.getPolizas = async (req, res) => {
  const listOfPolizas = await Poliza.findAll();

  const response = new CustomResponse(listOfPolizas);

  res.json(response);
};

module.exports.postPoliza = async (req, res) => {
  const { error, value } = validatePoliza(req.body);

  if (error) throw new ExpressError(error.details[0].message, 400);

  const cliente = await Cliente.findByPk(value.clienteId);

  if (!cliente) throw new ExpressError("cliente no encontrado", 404);

  const aseguradora = await Aseguradora.findByPk(value.aseguradoraId);

  if (!aseguradora) throw new ExpressError("aseguradora no encontrada", 404);

  const agente = await Agente.findByPk(value.agenteId);

  if (!agente) throw new ExpressError("agente no encontrado", 404);

  const vendedor = await Vendedor.findByPk(value.vendedorId);

  if (!vendedor) throw new ExpressError("vendedor no encontrado", 404);

  const producto = await Producto.findByPk(value.productoId);

  if (!producto) throw new ExpressError("producto no encontrado", 404);

  const poliza = await Poliza.create(value);

  const response = new CustomResponse(poliza);

  res.json(response);
};
