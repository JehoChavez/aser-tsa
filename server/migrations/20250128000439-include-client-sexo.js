"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("Clientes", "sexo", {
      type: Sequelize.STRING,
      validate: {
        isIn: [["m", "f"]],
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("Clientes", "sexo");
  },
};
