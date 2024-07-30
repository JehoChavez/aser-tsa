"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("recibos", "primaNeta", {
      type: Sequelize.FLOAT,
      allowNull: false,
    });
    await queryInterface.addColumn("recibos", "expedicion", {
      type: Sequelize.FLOAT,
    });
    await queryInterface.addColumn("recibos", "financiamiento", {
      type: Sequelize.FLOAT,
    });
    await queryInterface.addColumn("recibos", "iva", {
      type: Sequelize.FLOAT,
    });
    await queryInterface.addColumn("recibos", "otros", {
      type: Sequelize.FLOAT,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("recibos", "otros");
    await queryInterface.removeColumn("recibos", "iva");
    await queryInterface.removeColumn("recibos", "financiamiento");
    await queryInterface.removeColumn("recibos", "expedicion");
    await queryInterface.removeColumn("recibos", "primaNeta");
  },
};
