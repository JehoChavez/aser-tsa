"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("recibos", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      exhibicion: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      de: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      monto: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      fechaInicio: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      fechaLimite: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      fechaPago: {
        type: Sequelize.DATEONLY,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("recibos");
  },
};
