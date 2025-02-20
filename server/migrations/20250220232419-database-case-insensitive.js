"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`
      ALTER DATABASE \`aser-tsa\` CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
    `);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`
      ALTER DATABASE \`aser-tsa\` CHARACTER SET utf8mb4 COLLATE utf8mb4_bin;
    `);
  },
};
