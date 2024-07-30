"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.renameColumn("recibos", "monto", "primaTotal");
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.renameColumn("recibos", "primaTotal", "monto");
  },
};
