const { Recibo, Poliza, Endoso, Cliente, Aseguradora } = require("../models");
const { Op } = require("sequelize");
const CustomResponse = require("../utils/CustomResponse");

module.exports.getRecibos = async (req, res) => {
  const query = {
    include: [
      {
        model: Poliza,
        as: "poliza",
        attributes: ["noPoliza"],
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

  const listOfRecibos = await Recibo.findAll(query);

  const response = new CustomResponse(listOfRecibos, 200);

  res.json(response);
};

module.exports.getPolizaRecibos = async (req, res) => {
  const poliza = await Poliza.findByPk(req.params.id, {
    include: {
      model: Recibo,
      as: "recibos",
    },
  });

  if (!poliza) throw new ExpressError("poliza no encontrada", 404);

  const response = new CustomResponse(poliza.recibos);

  res.json(response);
};
