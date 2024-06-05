const { Recibo, Poliza, Endoso, Cliente, Aseguradora } = require("../models");
const { Op } = require("sequelize");
const CustomResponse = require("../utils/CustomResponse");

module.exports.getPendientes = async (req, res) => {
  const recibosQuery = {
    where: {
      fechaInicio: {
        [Op.and]: {
          [Op.gte]: req.query.desde,
          [Op.lte]: req.query.hasta,
        },
      },
      fechaPago: null,
    },
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

  const listOfRecibos = await Recibo.findAll(recibosQuery);

  const response = new CustomResponse({ listOfRecibos }, 200);

  res.status(response.status).json(response);
};
