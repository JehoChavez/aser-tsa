"use strict";

const productos = require("./data/productos.json");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("productos", productos, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("productos", null, {});
  },
};
