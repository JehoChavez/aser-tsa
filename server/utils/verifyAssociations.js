const { Cliente, Aseguradora, Agente, Vendedor, Ramo } = require("../models");
const ExpressError = require("./ExpressError");

const verifyPolizaAssociations = async (req, res) => {
  const { poliza: polizaData } = req.body;

  const cliente = await Cliente.findByPk(polizaData.clienteId);

  if (!cliente) throw new ExpressError("cliente no encontrado", 404);

  const aseguradora = await Aseguradora.findByPk(polizaData.aseguradoraId);

  if (!aseguradora) throw new ExpressError("aseguradora no encontrada", 404);

  const agente = await Agente.findByPk(polizaData.agenteId);

  if (!agente) throw new ExpressError("agente no encontrado", 404);

  const vendedor = await Vendedor.findByPk(polizaData.vendedorId);

  if (!vendedor) throw new ExpressError("vendedor no encontrado", 404);

  const ramo = await Ramo.findByPk(polizaData.ramoId);

  if (!ramo) throw new ExpressError("ramo no encontrado", 404);
};

module.exports.verifyPolizaAssociations = verifyPolizaAssociations;
