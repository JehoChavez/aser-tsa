"use strict";
const estados = require("./estados");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Estados", estados, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Estados", null, {});
  },
};
