"use strict";

const vendedores = require("./data/vendedores.json");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("vendedores", vendedores, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("vendedores", null, {});
  },
};
