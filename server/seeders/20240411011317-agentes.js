"use strict";

const agentes = require("./data/agentes.json");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("agentes", agentes, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("agentes", null, {});
  },
};
