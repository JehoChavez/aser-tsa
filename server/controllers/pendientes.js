const {
  Recibo,
  Poliza,
  Endoso,
  Cliente,
  Aseguradora,
  Ramo,
} = require("../models");
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
        attributes: ["id", "noPoliza", "moneda"],
        include: [
          {
            model: Cliente,
            as: "cliente",
            attributes: ["id", "nombre"],
          },
          {
            model: Aseguradora,
            as: "aseguradora",
            attributes: ["id", "aseguradora"],
          },
          {
            model: Ramo,
            as: "ramo",
          },
        ],
      },
      {
        model: Endoso,
        as: "endoso",
        attributes: ["id", "endoso"],
      },
    ],
    order: [["fechaInicio", "ASC"]],
  };

  const renovacionesQuery = {
    where: {
      finVigencia: {
        [Op.and]: {
          [Op.gte]: req.query.desde,
          [Op.lte]: req.query.hasta,
        },
        renovacionId: null,
      },
    },
    attributes: ["id", "noPoliza", "bienAsegurado", "finVigencia"],
    include: [
      {
        model: Ramo,
        as: "ramo",
      },
      {
        model: Cliente,
        as: "cliente",
        attributes: ["id", "tipoPersona", "nombre"],
      },
    ],
  };

  const listOfRecibos = await Recibo.findAll(recibosQuery);

  const lisfOfRenovaciones = await Poliza.findAll(renovacionesQuery);

  const response = new CustomResponse(
    { cobranza: listOfRecibos, renovaciones: lisfOfRenovaciones },
    200
  );

  res.status(response.status).json(response);
};
