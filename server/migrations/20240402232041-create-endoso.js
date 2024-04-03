"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("endosos", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      endoso: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      emision: {
        type: Sequelize.DATEONLY,
      },
      inicioVigencia: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      finVigencia: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      tipo: {
        type: Sequelize.STRING,
        validate: {
          isIn: [["A", "B", "D"]],
        },
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
    await queryInterface.dropTable("endosos");
  },
};
