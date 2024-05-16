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
const getMexicoDate = require("../utils/getMexicoDate");
const verificarPolizaVencida = require("../utils/verificarPolizaVencida");

module.exports.getPolizas = async (req, res) => {
  const {
    noPoliza,
    page,
    limit,
    tipoFecha = "inicioVigencia",
    desde,
    hasta,
    cliente,
    aseguradora,
    agente,
    vendedor,
    ramo,
    orden = "DESC",
    por = "inicioVigencia",
    estado,
  } = req.query;

  const filter = {};

  let whereClause = {};

  if (noPoliza) {
    filter.noPoliza = {
      [Op.like]: `%${noPoliza}%`,
    };
  }

  if (desde && hasta) {
    filter[tipoFecha] = {
      [Op.and]: {
        [Op.gte]: desde,
        [Op.lte]: hasta,
      },
    };
  } else if ((desde && !hasta) || (hasta && !desde)) {
    throw new ExpressError("desde y hasta deben ser incluidos", 400);
  }

  if (aseguradora) {
    filter.aseguradoraId = aseguradora;
  }

  if (agente) {
    filter.agenteId = agente;
  }

  if (vendedor) {
    filter.vendedorId = vendedor;
  }

  if (ramo) {
    filter.ramoId = ramo;
  }

  if (cliente) {
    filter.clienteId = cliente;
  }

  const estadoFilter = [];

  if (estado) {
    if (estado.includes("renovadas")) {
      estadoFilter.push({ renovacionId: { [Op.not]: null } });
    }
    if (estado.includes("reexpedidas")) {
      estadoFilter.push({ reexpedicionId: { [Op.not]: null } });
    }
    if (estado.includes("canceladas")) {
      estadoFilter.push({ fechaCancelacion: { [Op.not]: null } });
    }
    if (estado.includes("vigentes")) {
      estadoFilter.push({
        [Op.and]: [
          { reexpedicionId: null },
          { fechaCancelacion: null },
          { finVigencia: { [Op.gt]: getMexicoDate() } },
        ],
      });
    }
  }

  if (estadoFilter.length > 0) {
    whereClause = {
      [Op.and]: {
        [Op.and]: filter,
        [Op.or]: estadoFilter,
      },
    };
  } else {
    whereClause = filter;
  }

  const order = [por, orden];

  const options = {
    where: whereClause,
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
        attributes: ["id", "clave", "nombre"],
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
      {
        model: Recibo,
        as: "recibos",
        attributes: ["fechaLimite", "fechaPago"],
      },
    ],
    order: [order],
    limit: 10,
  };

  if (page) {
    options.offset = (parseInt(page) - 1) * (parseInt(limit) || options.limit);
  }

  if (limit) {
    options.limit = parseInt(limit);
  }

  let listOfPolizas = await Poliza.findAll(options);

  listOfPolizas = listOfPolizas.map((poliza) =>
    verificarPolizaVencida(poliza.dataValues)
  );

  const response = new CustomResponse(listOfPolizas);

  res.json(response);
};

module.exports.getPoliza = async (req, res) => {
  let poliza = await Poliza.findByPk(req.params.id, {
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

  poliza = verificarPolizaVencida(poliza.dataValues);

  const response = new CustomResponse(poliza);

  res.json(response);
};

module.exports.postPoliza = async (req, res) => {
  const { poliza: polizaData } = req.body;
  const { recibos: recibosData } = req.body;

  polizaData.recibos = recibosData;

  const existingPoliza = await Poliza.findOne({
    where: {
      noPoliza: polizaData.noPoliza,
    },
  });

  if (existingPoliza) throw new ExpressError("poliza ya existente", 400);

  const poliza = await Poliza.create(polizaData, {
    include: {
      model: Recibo,
      as: "recibos",
    },
  });

  const response = new CustomResponse({ poliza }, 201);

  res.json(response);
};

module.exports.updatePoliza = async (req, res) => {
  const poliza = await Poliza.findByPk(req.params.id);

  if (!poliza) throw new ExpressError("poliza no encontrada", 404);

  const { poliza: polizaData } = req.body;
  const { recibos: recibosData } = req.body;

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
  const poliza = await Poliza.findByPk(req.params.id);

  if (!poliza) throw new ExpressError("poliza no encontrada", 404);

  const deleted = await poliza.destroy();

  const response = new CustomResponse(deleted);

  res.json(response);
};

module.exports.reexpedirPoliza = async (req, res) => {
  const poliza = await Poliza.findByPk(req.params.id);

  if (!poliza) throw new ExpressError("poliza no encontrada", 404);

  const { poliza: polizaData, recibos: recibosData } = req.body;
  polizaData.recibos = recibosData;

  const t = await sequelize.transaction();

  try {
    await Endoso.destroy(
      {
        where: {
          polizaId: req.params.id,
        },
      },
      { transaction: t }
    );

    await Recibo.destroy(
      {
        where: {
          polizaId: req.params.id,
        },
      },
      { transaction: t }
    );

    const reexpedicion = await Poliza.create(
      polizaData,
      {
        include: {
          model: Recibo,
          as: "recibos",
        },
      },
      { transaction: t }
    );

    poliza.reexpedicionId = reexpedicion.id;
    await poliza.save({ transaction: t });

    await t.commit();

    const response = new CustomResponse(reexpedicion, 201);

    res.json(response);
  } catch (error) {
    await t.rollback();

    throw new ExpressError(error, 500);
  }
};

module.exports.renovarPoliza = async (req, res) => {
  const poliza = await Poliza.findByPk(req.params.id);

  if (!poliza) throw new ExpressError("poliza no encontrada", 404);

  const { poliza: polizaData, recibos: recibosData } = req.body;

  polizaData.recibos = recibosData;

  const t = await sequelize.transaction();

  try {
    const renovacion = await Poliza.create(polizaData, {
      include: {
        model: Recibo,
        as: "recibos",
      },
      transaction: t,
    });

    poliza.renovacionId = renovacion.id;
    await poliza.save({ transaction: t });

    await t.commit();

    const response = new CustomResponse(renovacion, 201);

    res.json(response);
  } catch (error) {
    await t.rollback();

    throw new ExpressError(error, 500);
  }
};

module.exports.cambiarContratante = async (req, res) => {
  const poliza = await Poliza.findByPk(req.params.id);

  if (!poliza) throw new ExpressError("poliza no encontrada", 404);

  const cliente = await Cliente.findByPk(req.body.clienteId);

  if (!cliente) throw new ExpressError("cliente no encontrado", 404);

  poliza.clienteId = req.body.clienteId;

  const updated = await poliza.save();

  const response = new CustomResponse(updated, 200);

  res.json(response);
};

module.exports.cancelarPoliza = async (req, res) => {
  const poliza = await Poliza.findByPk(req.params.id);

  if (!poliza) throw new ExpressError("poliza no encontrada", 404);

  poliza.fechaCancelacion = req.body.fechaCancelacion;

  const cancelada = await poliza.save();

  const response = new CustomResponse(cancelada, 200);

  res.json(response);
};

module.exports.anularCancelacion = async (req, res) => {
  const poliza = await Poliza.findByPk(req.params.id);

  if (!poliza) throw new ExpressError("poliza no encontrada", 404);

  poliza.fechaCancelacion = null;

  const anulada = await poliza.save();

  const response = new CustomResponse(anulada, 200);

  res.json(response);
};
