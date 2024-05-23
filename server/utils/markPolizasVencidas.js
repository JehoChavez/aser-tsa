const { Op } = require("sequelize");
const { Poliza, Recibo, sequelize } = require("../models");

const markPolizasVencidas = async () => {
  const date = new Date();

  const t = await sequelize.transaction();

  try {
    const polizasToUpdate = await Poliza.findAll({
      attributes: ["id"],
      where: {
        vencida: {
          [Op.not]: true,
        },
        fechaCancelacion: null,
      },
      include: {
        model: Recibo,
        as: "recibos",
        where: {
          fechaPago: null,
          fechaLimite: {
            [Op.lte]: date,
          },
        },
        required: true,
      },
      transaction: t,
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
          transaction: t,
        }
      );
    }

    await t.commit();
    console.log(`${polizaIds.length} polizas fueron marcadas como vencidas`);
  } catch (error) {
    await t.rollback();
    console.log("Error al marcar polizas como vencidas", error);
  }
};

module.exports = markPolizasVencidas;
