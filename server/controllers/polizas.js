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
const csv = require("csv-parser");
const { Readable } = require("stream");
const { uploadedPolizaSchema } = require("../utils/validator");

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

  const filter = [];

  let whereClause = {};

  // Find poliza by numero
  if (noPoliza) {
    filter.push({
      noPoliza: {
        [Op.like]: `%${noPoliza}%`,
      },
    });
  }

  // Filter by date
  if (desde && hasta) {
    filter.push({
      [tipoFecha]: {
        [Op.and]: {
          [Op.gte]: desde,
          [Op.lte]: hasta,
        },
      },
    });
  } else if ((desde && !hasta) || (hasta && !desde)) {
    throw new ExpressError("desde y hasta deben ser incluidos", 400);
  }

  // Filter by aseguradora IDs
  if (aseguradora) {
    filter.push({
      aseguradoraId: {
        [Op.in]: aseguradora,
      },
    });
  }

  // Filter by agente IDs
  if (agente) {
    filter.push({
      agenteId: {
        [Op.in]: agente,
      },
    });
  }

  // Filter by vendedor IDs
  if (vendedor) {
    filter.push({
      vendedorId: {
        [Op.in]: vendedor,
      },
    });
  }

  // Filter by ramo IDs
  if (ramo) {
    filter.push({
      ramoId: {
        [Op.in]: ramo,
      },
    });
  }

  // Filter by cliente IDs
  if (cliente) {
    filter.push({
      clienteId: {
        [Op.in]: cliente,
      },
    });
  }

  // Estado filters
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
          { vencida: { [Op.not]: true } },
        ],
      });
    }
    if (estado.includes("vencidas")) {
      estadoFilter.push({
        vencida: true,
      });
    }
  }

  // Build the where clause
  if (filter.length > 0 && estadoFilter.length > 0) {
    whereClause = {
      [Op.and]: {
        [Op.and]: filter,
        [Op.or]: estadoFilter,
      },
    };
  } else if (filter.length > 0) {
    whereClause = {
      [Op.and]: filter,
    };
  } else if (estadoFilter.length > 0) {
    whereClause = {
      [Op.or]: estadoFilter,
    };
  } else {
    whereClause = null;
  }

  // Order
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
      "fechaCancelacion",
      "vencida",
      "renovacionId",
      "reexpedicionId",
      "formaPago",
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
        attributes: ["id", "aseguradora", "plazoPrimer", "plazoSubsecuentes"],
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
    order: [order],
    limit: 10,
  };

  // Pagination
  if (page) {
    options.offset = (parseInt(page) - 1) * (parseInt(limit) || options.limit);
  }

  if (limit) {
    options.limit = parseInt(limit);
  }

  const { count, rows: polizas } = await Poliza.findAndCountAll(options);

  const response = new CustomResponse(polizas, undefined, undefined, count);

  res.status(response.status).json(response);
};

module.exports.getPoliza = async (req, res) => {
  let poliza = await Poliza.findByPk(req.params.id, {
    include: [
      {
        model: Cliente,
        as: "cliente",
        attributes: [
          "id",
          "tipoPersona",
          "nombre",
          "rfc",
          "calle",
          "exterior",
          "interior",
          "colonia",
          "codigoPostal",
        ],
      },
      {
        model: Aseguradora,
        as: "aseguradora",
        attributes: ["id", "aseguradora", "plazoPrimer", "plazoSubsecuentes"],
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
        include: [
          {
            model: Endoso,
            as: "endoso",
            attributes: ["endoso"],
          },
        ],
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
        as: "renueva",
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
      {
        model: Poliza,
        as: "reexpide",
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
    order: [[{ model: Recibo, as: "recibos" }, "fechaInicio", "ASC"]],
  });

  if (!poliza) throw new ExpressError("poliza no encontrada", 404);

  const response = new CustomResponse(poliza);

  res.status(response.status).json(response);
};

module.exports.postPoliza = async (req, res) => {
  const { poliza: polizaData } = req.body;
  const { recibos: recibosData } = req.body;

  polizaData.recibos = recibosData;

  // Check if poliza already exists
  const existingPoliza = await Poliza.findOne({
    where: {
      noPoliza: polizaData.noPoliza,
    },
  });

  if (existingPoliza) throw new ExpressError("poliza ya existente", 400);

  // Create poliza and recibos
  const poliza = await Poliza.create(polizaData, {
    include: {
      model: Recibo,
      as: "recibos",
    },
  });

  const response = new CustomResponse({ poliza }, 201);

  res.status(response.status).json(response);
};

module.exports.updatePoliza = async (req, res) => {
  const poliza = await Poliza.findByPk(req.params.id);

  if (!poliza) throw new ExpressError("poliza no encontrada", 404);

  const { poliza: polizaData } = req.body;
  const { recibos: recibosData } = req.body;

  const t = await sequelize.transaction();

  try {
    // Delete existing recibos
    await Recibo.destroy({
      where: {
        polizaId: poliza.id,
      },
      transaction: t,
    });

    // Delete existin endosos
    await Endoso.destroy({
      where: {
        polizaId: poliza.id,
      },
      transaction: t,
    });

    polizaData.vencida = false;

    // Update poliza
    poliza.set(polizaData);
    const updatedPoliza = await poliza.save({ transaction: t });

    // Create new recibos
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

    res.status(response.status).json(response);
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

  res.status(response.status).json(response);
};

module.exports.reexpedirPoliza = async (req, res) => {
  const { id } = req.params;
  const { poliza: polizaData, recibos: recibosData } = req.body;

  // Wrap everything in a transaction
  const t = await sequelize.transaction();

  try {
    // Find the existing poliza
    const poliza = await Poliza.findByPk(id, { transaction: t });
    if (!poliza) {
      throw new ExpressError("poliza no encontrada", 404);
    }

    // Delete existing endosos and recibos within the transaction
    await Endoso.destroy({
      where: { polizaId: id },
      transaction: t,
    });

    await Recibo.destroy({
      where: { polizaId: id },
      transaction: t,
    });

    // Create new poliza (reexpedicion) and recibos
    polizaData.recibos = recibosData;
    const reexpedicion = await Poliza.create(polizaData, {
      include: {
        model: Recibo,
        as: "recibos",
      },
      transaction: t,
    });

    // Set previous poliza reexpedicionId to the new poliza ID
    poliza.reexpedicionId = reexpedicion.id;
    await poliza.save({ transaction: t });

    // Commit the transaction
    await t.commit();

    // Respond with the newly created reexpedicion
    const response = new CustomResponse(reexpedicion, 201);
    res.status(response.status).json(response);
  } catch (error) {
    // Rollback the transaction in case of error
    await t.rollback();

    // Handle the error properly
    if (error instanceof ExpressError) {
      res.status(error.status).json({ message: error.message });
    } else {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
};

module.exports.renovarPoliza = async (req, res) => {
  const poliza = await Poliza.findByPk(req.params.id);

  if (!poliza) throw new ExpressError("poliza no encontrada", 404);

  const { poliza: polizaData, recibos: recibosData } = req.body;

  polizaData.recibos = recibosData;

  const t = await sequelize.transaction();

  try {
    // Create new poliza (renovacion) and recibos
    const renovacion = await Poliza.create(polizaData, {
      include: {
        model: Recibo,
        as: "recibos",
      },
      transaction: t,
    });

    // Set previous poliza renovacionId to the new poliza ID
    poliza.renovacionId = renovacion.id;
    await poliza.save({ transaction: t });

    await t.commit();

    const response = new CustomResponse(renovacion, 201);

    res.status(response.status).json(response);
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

  res.status(response.status).json(response);
};

module.exports.cancelarPoliza = async (req, res) => {
  const poliza = await Poliza.findByPk(req.params.id);

  if (!poliza) throw new ExpressError("poliza no encontrada", 404);

  poliza.fechaCancelacion = req.body.fechaCancelacion;

  const cancelada = await poliza.save();

  const response = new CustomResponse(cancelada, 200);

  res.status(response.status).json(response);
};

module.exports.anularCancelacion = async (req, res) => {
  const poliza = await Poliza.findByPk(req.params.id);

  if (!poliza) throw new ExpressError("poliza no encontrada", 404);

  poliza.fechaCancelacion = null;

  const anulada = await poliza.save();

  const response = new CustomResponse(anulada, 200);

  res.status(response.status).json(response);
};

module.exports.uploadPolizas = async (req, res) => {
  if (!req.file) throw new ExpressError("No se ha subido ningún archivo", 400);

  const results = [];
  const errors = [];

  let csvString = req.file.buffer.toString("utf8");
  if (csvString.charCodeAt(0) === 0xfeff) {
    csvString = csvString.slice(1);
  }

  const stream = Readable.from(csvString);

  const processRow = async (row) => {
    const { error, value } = uploadedPolizaSchema.validate(row);

    if (error) {
      errors.push({ error: error.details[0].message, row });
    } else {
      results.push(value);
    }
  };

  const promises = [];

  stream
    .pipe(csv())
    .on("data", (row) => {
      promises.push(processRow(row));
    })
    .on("error", (error) => {
      throw new ExpressError(error.message, 400);
    })
    .on("end", async () => {
      await Promise.all(promises);

      if (results.length === 0) {
        const response = new CustomResponse(
          { errors },
          400,
          "No se ha creado ninguna póliza"
        );
        res.status(response.status).json(response);
      } else {
        const response = new CustomResponse({ results, errors });

        res.status(response.status).json(response);
      }
    });
};
