"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.removeConstraint(
      "polizas",
      "polizas_renovacionId_foreign_idx"
    );

    await queryInterface.addConstraint("polizas", {
      fields: ["renovacionId"],
      type: "foreign key",
      name: "polizas_renovacionId_foreign_idx",
      references: {
        table: "polizas",
        field: "id",
      },
      onDelete: "SET NULL",
      onUpdate: "CASCADE",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint(
      "polizas",
      "polizas_renovacionId_foreign_idx"
    );

    await queryInterface.addConstraint("polizas", {
      fields: ["renovacionId"],
      type: "foreign key",
      name: "polizas_renovacionId_foreign_idx",
      references: {
        table: "polizas",
        field: "id",
      },
      onDelete: "RESTRICT",
      onUpdate: "CASCADE",
    });
  },
};
