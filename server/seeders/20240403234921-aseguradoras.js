"use strict";

const aseguradoras = require("./data/aseguradoras.json");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("aseguradoras", aseguradoras, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("aseguradoras", null, {});
  },
};
