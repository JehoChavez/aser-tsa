const { Op } = require("sequelize");
const { Poliza, Recibo } = require("../models");
const getMexicoDate = require("./getMexicoDate");

const markPolizasVencidas = async () => {
  const date = new Date(getMexicoDate());

  const polizasToUpdate = await Poliza.findAll({
    attributes: ["id"],
    include: {
      model: Recibo,
      as: "recibos",
      where: {
        fechaPago: null,
        fechaLimite: {
          [Op.lt]: date,
        },
      },
      required: true,
    },
  });

  const polizaIds = polizasToUpdate.map((poliza) => poliza.id);

  if (polizaIds.length > 0) {
    await Poliza.update(
      { vencida: true },
      {
        where: {
          id: {
            [Op.in]: polizaIds,
          },
        },
      }
    );
  }
};

module.exports = markPolizasVencidas;
