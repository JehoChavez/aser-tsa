const { Op } = require("sequelize");
const { Poliza, Recibo, sequelize } = require("../models");
const CustomResponse = require("../utils/CustomResponse");
const ExpressError = require("../utils/ExpressError");

module.exports.getReporte = async (req, res) => {
  const { desde, hasta, aseguradora, agente, vendedor, ramo } = req.query;

  const filter = {};

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
    filter.aseguradoraId = {
      [Op.in]: aseguradora,
    };
  }

  // Filter by agente IDs
  if (agente) {
    filter.agenteId = {
      [Op.in]: agente,
    };
  }

  // Filter by vendedor IDs
  if (vendedor) {
    filter.vendedorId = {
      [Op.in]: vendedor,
    };
  }

  // Filter by ramo IDs
  if (ramo) {
    filter.ramoId = {
      [Op.in]: ramo,
    };
  }

  const t = await sequelize.transaction();

  try {
    // Get emitted policies count
    const polizasEmitidas = await Poliza.count({
      where: {
        ...filter,
        emision: dateFilter,
      },
      transaction: t,
    });

    // Get emitted premiums count
    const primaNetaEmitida = await Poliza.sum("primaNeta", {
      where: {
        ...filter,
        emision: dateFilter,
      },
      transaction: t,
    });

    const primaTotalEmitida = await Poliza.sum("primaTotal", {
      where: {
        ...filter,
        emision: dateFilter,
      },
      transaction: t,
    });

    // Get charged premiums count
    const primaNetaCobrada = await Recibo.sum("Recibo.primaNeta", {
      where: {
        fechaPago: dateFilter,
      },
      include: [
        {
          model: Poliza,
          as: "poliza",
          required: true,
          where: {
            ...filter,
          },
          attributes: [],
        },
      ],
      transaction: t,
    });

    const primaTotalCobrada = await Recibo.sum("Recibo.primaTotal", {
      where: {
        fechaPago: dateFilter,
      },
      include: [
        {
          model: Poliza,
          as: "poliza",
          required: true,
          where: {
            ...filter,
          },
          attributes: [],
        },
      ],
      transaction: t,
    });

    const response = new CustomResponse(
      {
        polizasEmitidas: polizasEmitidas,
        primaNetaEmitida: primaNetaEmitida,
        primaTotalEmitida: primaTotalEmitida,
        primaNetaCobrada: primaNetaCobrada,
        primaTotalCobrada: primaTotalCobrada,
      },
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
