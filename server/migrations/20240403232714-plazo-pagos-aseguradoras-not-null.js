"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn("aseguradoras", "plazoPrimer", {
      type: Sequelize.INTEGER,
      defaultValue: 0,
    });

    await queryInterface.changeColumn("aseguradoras", "plazoSubsecuentes", {
      type: Sequelize.INTEGER,
      defaultValue: 0,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn("aseguradoras", "plazoPrimer", {
      defaultValue: null,
    });

    await queryInterface.changeColumn("aseguradoras", "plazoSubsecuentes", {
      defaultValue: null,
    });
  },
};
