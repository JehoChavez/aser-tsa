"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("polizas", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      noPoliza: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      emision: {
        type: Sequelize.STRING,
      },
      inicioVigencia: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      finVigencia: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      bienAsegurado: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      primaNeta: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      expedicion: {
        type: Sequelize.FLOAT,
      },
      financiamiento: {
        type: Sequelize.FLOAT,
      },
      iva: {
        type: Sequelize.FLOAT,
      },
      primaTotal: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      moneda: {
        type: Sequelize.STRING,
        validate: {
          isIn: [["MXN", "USD", "UDI"]],
        },
      },
      formaPago: {
        type: Sequelize.INTEGER,
        validate: {
          isIn: [[1, 2, 4, 12]],
        },
      },
      comentarios: {
        type: Sequelize.STRING,
      },
      fechaCancelacion: {
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
    await queryInterface.dropTable("polizas");
  },
};
