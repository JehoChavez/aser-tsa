const { Recibo, Poliza, Endoso, Cliente, Aseguradora } = require("../models");
const CustomResponse = require("../utils/CustomResponse");

module.exports.getRecibos = async (req, res) => {
  const listOfRecibos = await Recibo.findAll({
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
  });

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
