const { Op } = require("sequelize");
const {
  Poliza,
  Cliente,
  Aseguradora,
  Agente,
  Vendedor,
  Ramo,
  Recibo,
  Endoso,
  sequelize,
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
    include: [
      {
        model: Cliente,
        as: "cliente",
        attributes: ["id", "tipoPersona", "nombre", "rfc"],
      },
      {
        model: Aseguradora,
        as: "aseguradora",
        attributes: ["id", "aseguradora"],
      },
      {
        model: Agente,
        as: "agente",
        attributes: ["id", "clave", "nombre"],
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
      {
        model: Endoso,
        as: "endosos",
      },
      {
        model: Recibo,
        as: "recibos",
      },
      {
        model: Poliza,
        as: "renovacion",
        attributes: [
          "id",
          "noPoliza",
          "inicioVigencia",
          "finVigencia",
          "primaNeta",
          "primaTotal",
        ],
      },
      {
        model: Poliza,
        as: "reexpedicion",
        attributes: [
          "id",
          "noPoliza",
          "inicioVigencia",
          "finVigencia",
          "primaNeta",
          "primaTotal",
        ],
      },
    ],
  });

  if (!poliza) throw new ExpressError("poliza no encontrada", 404);

  const response = new CustomResponse(poliza);

  res.json(response);
};

module.exports.postPoliza = async (req, res) => {
  const { error, value } = validatePoliza(req.body);

  if (error) throw new ExpressError(error.details[0].message, 400);

  const { poliza: polizaData } = value;
  const { recibos: recibosData } = value;

  const existingPoliza = await Poliza.findAll({
    where: {
      noPoliza: polizaData.noPoliza,
    },
  });

  if (existingPoliza[0]) throw new ExpressError("poliza ya existente", 400);

  const t = await sequelize.transaction();

  try {
    const poliza = await Poliza.create(polizaData, { transaction: t });

    const recibos = await Promise.all(
      recibosData.map(async (reciboData) => {
        const recibo = await Recibo.create(
          { ...reciboData, polizaId: poliza.id },
          { transaction: t }
        );
        return recibo;
      })
    );

    await t.commit();

    const response = new CustomResponse({ poliza, recibos });

    res.json(response);
  } catch (error) {
    await t.rollback();

    throw new ExpressError(error);
  }
};

module.exports.updatePoliza = async (req, res) => {
  const { error: idError, value: idValue } = validateGenericId(req.params);

  if (idError) throw new ExpressError(idError.details[0].message, 400);

  const poliza = await Poliza.findByPk(idValue.id);

  if (!poliza) throw new ExpressError("poliza no encontrada", 404);

  const { error: polizaError, value: polizaValue } = validatePoliza(req.body);

  if (polizaError) throw new ExpressError(polizaError.details[0].message, 400);

  const { poliza: polizaData } = polizaValue;
  const { recibos: recibosData } = polizaValue;

  const t = await sequelize.transaction();

  try {
    await Recibo.destroy(
      {
        where: {
          polizaId: poliza.id,
        },
      },
      { transaction: t }
    );

    poliza.set(polizaData);
    const updatedPoliza = await poliza.save();

    const recibos = await Promise.all(
      recibosData.map(async (reciboData) => {
        const recibo = await Recibo.create(
          { ...reciboData, polizaId: updatedPoliza.id },
          { transaction: t }
        );
        return recibo;
      })
    );

    await t.commit();

    const response = new CustomResponse({ updatedPoliza, recibos });

    res.json(response);
  } catch (error) {
    await t.rollback();

    throw new ExpressError(error);
  }
};

module.exports.deletePoliza = async (req, res) => {
  const { error, value } = validateGenericId(req.params);

  if (error) throw new ExpressError(error.details[0].message, 404);

  const poliza = await Poliza.findByPk(value.id);

  if (!poliza) throw new ExpressError("poliza no encontrada", 404);

  const deleted = await poliza.destroy();

  const response = new CustomResponse(deleted);

  res.json(response);
};
