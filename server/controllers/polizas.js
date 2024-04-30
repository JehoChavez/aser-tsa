const { Op } = require("sequelize");
const {
  Poliza,
  Cliente,
  Aseguradora,
  Agente,
  Vendedor,
  Ramo,
} = require("../models");
const CustomResponse = require("../utils/CustomResponse");
const ExpressError = require("../utils/ExpressError");
const { validatePoliza, validateGenericId } = require("../utils/validator");

module.exports.getPolizas = async (req, res) => {
  const options = {
    attributes: [
      "id",
      "noPoliza",
      "emision",
      "inicioVigencia",
      "finVigencia",
      "bienAsegurado",
      "primaNeta",
      "primaTotal",
      "moneda",
    ],
    include: [
      {
        model: Agente,
        as: "agente",
        attributes: ["clave", "nombre"],
      },
      {
        model: Aseguradora,
        as: "aseguradora",
        attributes: ["id", "aseguradora"],
      },
      {
        model: Cliente,
        as: "cliente",
        attributes: ["id", "tipoPersona", "nombre"],
      },
      {
        model: Vendedor,
        as: "vendedor",
        attributes: ["id", "nombre"],
      },
      {
        model: Ramo,
        as: "ramo",
      },
    ],
  };

  if (req.query.noPoliza) {
    options.where = {
      noPoliza: {
        [Op.like]: `%${req.query.noPoliza}%%`,
      },
    };
  }

  const listOfPolizas = await Poliza.findAll(options);

  const response = new CustomResponse(listOfPolizas);

  res.json(response);
};

module.exports.getPoliza = async (req, res) => {
  const { error, value } = validateGenericId(req.params);

  if (error) throw new ExpressError(error.details[0].message, 400);

  const poliza = await Poliza.findByPk(value.id, {
    include: { all: true },
  });

  if (!poliza) throw new ExpressError("poliza no encontrada", 404);

  const response = new CustomResponse(poliza);

  res.json(response);
};

module.exports.postPoliza = async (req, res) => {
  const { error, value } = validatePoliza(req.body);

  if (error) throw new ExpressError(error.details[0].message, 400);

  const existingPoliza = await Poliza.findAll({
    where: {
      noPoliza: value.noPoliza,
    },
  });

  if (existingPoliza[0]) throw new ExpressError("poliza ya existente", 400);

  const cliente = await Cliente.findByPk(value.clienteId);

  if (!cliente) throw new ExpressError("cliente no encontrado", 404);

  const aseguradora = await Aseguradora.findByPk(value.aseguradoraId);

  if (!aseguradora) throw new ExpressError("aseguradora no encontrada", 404);

  const agente = await Agente.findByPk(value.agenteId);

  if (!agente) throw new ExpressError("agente no encontrado", 404);

  const vendedor = await Vendedor.findByPk(value.vendedorId);

  if (!vendedor) throw new ExpressError("vendedor no encontrado", 404);

  const ramo = await Ramo.findByPk(value.ramoId);

  if (!ramo) throw new ExpressError("ramo no encontrado", 404);

  const poliza = await Poliza.create(value);

  const response = new CustomResponse(poliza);

  res.json(response);
};
