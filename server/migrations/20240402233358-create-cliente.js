"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("clientes", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      tipoPersona: {
        type: Sequelize.STRING,
        validate: {
          isIn: [["fisica", "moral"]],
        },
      },
      nombre: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      nacimiento: {
        type: Sequelize.DATEONLY,
      },
      rfc: {
        type: Sequelize.STRING,
      },
      calle: {
        type: Sequelize.STRING,
      },
      exterior: {
        type: Sequelize.STRING,
      },
      interior: {
        type: Sequelize.STRING,
      },
      colonia: {
        type: Sequelize.STRING,
      },
      codigoPostal: {
        type: Sequelize.STRING,
      },
      correo: {
        type: Sequelize.STRING,
      },
      telefono: {
        type: Sequelize.STRING,
      },
      empresa: {
        type: Sequelize.STRING,
      },
      comentarios: {
        type: Sequelize.STRING,
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
    await queryInterface.dropTable("clientes");
  },
};
