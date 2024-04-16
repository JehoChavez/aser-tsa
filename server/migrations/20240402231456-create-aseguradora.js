"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("aseguradoras", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      aseguradora: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      plazoPrimer: {
        type: Sequelize.INTEGER,
      },
      plazoSubsecuentes: {
        type: Sequelize.INTEGER,
      },
      comentarios: {
        type: Sequelize.STRING,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("aseguradoras");
  },
};
