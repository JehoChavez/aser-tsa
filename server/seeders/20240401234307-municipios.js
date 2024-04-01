"use strict";
const municipios = require("./municipios");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Municipios", municipios, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Municipios", null, {});
  },
};
