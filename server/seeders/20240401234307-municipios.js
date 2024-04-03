"use strict";
const municipios = require("./municipios");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Municipios", municipios, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Municipios", null, {});
  },
};
