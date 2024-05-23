const { Poliza } = require("../models");
const { Op } = require("sequelize");

module.exports = async () => {
  const date = new Date();
  const currentYear = date.getFullYear();
  date.setFullYear(currentYear - 5);

  try {
    const deleted = await Poliza.destroy({
      where: {
        finVigencia: {
          [Op.lt]: date,
        },
      },
    });

    console.log(`${deleted} polizas fueron eliminadas por antigüedad`);
  } catch (error) {
    console.log("error al eliminar polizas anteriores a 5 años", error);
  }
};
