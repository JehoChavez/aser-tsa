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

module.exports.getReporte = async (req, res) => {
  const { desde, hasta, aseguradora, agente, vendedor, ramo } = req.query;

  const filter = [];

  const dateFilter = {};

  // Filter by date
  if (desde && hasta) {
    dateFilter[Op.and] = {
      [Op.gte]: desde,
      [Op.lte]: hasta,
    };
  } else {
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

  const t = await sequelize.transaction();

  try {
    // Get emitted policies count
    const polizasCount = await Poliza.count({
      where: {
        ...filter,
        emision: dateFilter,
      },
      transaction: t,
    });

    const response = new CustomResponse(
      { polizasEmitidas: polizasCount },
      200,
      undefined,
      undefined
    );

    res.status(response.status).json(response);
  } catch (error) {
    await t.rollback();
    console.log(error);
    throw new ExpressError("Error al generar el reporte", 500);
  }
};
