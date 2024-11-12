const {
  Recibo,
  Poliza,
  Endoso,
  Cliente,
  Aseguradora,
  Ramo,
  sequelize,
} = require("../models");
const { Op } = require("sequelize");
const CustomResponse = require("../utils/CustomResponse");
const ExpressError = require("../utils/ExpressError");

module.exports.getRecibos = async (req, res) => {
  const query = {
    include: [
      {
        model: Poliza,
        as: "poliza",
        attributes: ["id", "noPoliza", "moneda"],
        include: [
          {
            model: Cliente,
            as: "cliente",
            attributes: ["nombre"],
          },
          {
            model: Aseguradora,
            as: "aseguradora",
            attributes: ["aseguradora"],
          },
          {
            model: Ramo,
            as: "Ramo",
          },
        ],
      },
      {
        model: Endoso,
        as: "endoso",
        attributes: ["endoso"],
      },
    ],
    order: [["fechaInicio", "ASC"]],
  };

  // Filter by date
  if (req.query.desde && req.query.hasta) {
    query.where = {
      fechaInicio: {
        [Op.and]: {
          [Op.gte]: req.query.desde,
          [Op.lte]: req.query.hasta,
        },
      },
    };
  }

  // TODO: revisar que funcione correctamente enviando desde frontend
  if (req.query.pendientes) {
    query.where = { ...query.where, fechaPago: null };
  }

  const listOfRecibos = await Recibo.findAll(query);

  const response = new CustomResponse(listOfRecibos, 200);

  res.status(response.status).json(response);
};

module.exports.getPolizaRecibos = async (req, res) => {
  const recibos = await Recibo.findAll({
    where: {
      polizaId: req.params.id,
    },
    include: {
      model: Endoso,
      as: "endoso",
      attributes: ["endoso"],
    },
    order: [["fechaInicio", "ASC"]],
  });

  const response = new CustomResponse(recibos);

  res.status(response.status).json(response);
};

module.exports.getEndosoRecibos = async (req, res) => {
  const recibos = await Recibo.findAll({
    where: {
      endosoId: req.params.id,
    },
    order: [["fechaInicio", "ASC"]],
  });

  const response = new CustomResponse(recibos);

  res.status(response.status).json(response);
};

module.exports.pagarRecibo = async (req, res) => {
  const date = new Date();

  const recibo = await Recibo.findByPk(req.params.id);

  if (!recibo) throw new ExpressError("recibo no encontrado", 404);

  const t = await sequelize.transaction();

  try {
    recibo.fechaPago = req.body.fechaPago;

    const pagado = await recibo.save({ transaction: t });

    const expiredRecibo = await Recibo.findOne({
      where: {
        polizaId: recibo.polizaId,
        fechaPago: null,
        fechaLimite: {
          [Op.lte]: date,
        },
      },
      transaction: t,
    });

    if (!expiredRecibo) {
      // Set poliza.vencida to false when a recibo is paid and there are no expired recibos
      await Poliza.update(
        { vencida: false },
        {
          where: {
            id: recibo.polizaId,
          },
          transaction: t,
        }
      );
    }

    await t.commit();

    const response = new CustomResponse(pagado, 200);

    res.status(response.status).json(response);
  } catch (error) {
    await t.rollback();

    throw new ExpressError("something went wrong", 500);
  }
};

module.exports.anularPago = async (req, res) => {
  const date = new Date();

  const t = await sequelize.transaction();

  try {
    const recibo = await Recibo.findByPk(req.params.id, { transaction: t });

    if (!recibo) throw new ExpressError("recibo no encontrado", 404);

    recibo.fechaPago = null;

    if (new Date(recibo.fechaLimite) < date) {
      const poliza = await Poliza.findByPk(recibo.polizaId, { transaction: t });

      poliza.vencida = true;

      await poliza.save({ transaction: t });
    }

    const anulado = await recibo.save({ transaction: t });

    await t.commit();

    const response = new CustomResponse(anulado, 200);

    res.status(response.status).json(response);
  } catch (error) {
    await t.rollback();

    throw new ExpressError("something went wrong", 500);
  }
};
