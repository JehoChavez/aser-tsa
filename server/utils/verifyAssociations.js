const { Cliente, Aseguradora, Agente, Vendedor, Ramo } = require("../models");
const ExpressError = require("./ExpressError");

const verifyPolizaAssociations = async (req, res) => {
  console.log(req.body);
  const cliente = await Cliente.findByPk(req.body.clienteId);

  if (!cliente) throw new ExpressError("cliente no encontrado", 404);

  const aseguradora = await Aseguradora.findByPk(req.body.aseguradoraId);

  if (!aseguradora) throw new ExpressError("aseguradora no encontrada", 404);

  const agente = await Agente.findByPk(req.body.agenteId);

  if (!agente) throw new ExpressError("agente no encontrado", 404);

  const vendedor = await Vendedor.findByPk(req.body.vendedorId);

  if (!vendedor) throw new ExpressError("vendedor no encontrado", 404);

  const ramo = await Ramo.findByPk(req.body.ramoId);

  if (!ramo) throw new ExpressError("ramo no encontrado", 404);
};

module.exports.verifyPolizaAssociations = verifyPolizaAssociations;
