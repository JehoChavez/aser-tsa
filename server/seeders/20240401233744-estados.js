"use strict";
const estados = require("./estados");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Estados", estados, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Estados", null, {});
  },
};
