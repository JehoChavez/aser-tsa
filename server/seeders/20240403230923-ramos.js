"use strict";

const ramos = require("./data/ramos.json");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("ramos", ramos, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("ramos", null, {});
  },
};
