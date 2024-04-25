"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("agentes", "aseguradoraId", {
      type: Sequelize.INTEGER,
      references: {
        model: "aseguradoras",
        key: "id",
      },
      allowNull: false,
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    });

    await queryInterface.addColumn("endosos", "polizaId", {
      type: Sequelize.INTEGER,
      references: {
        model: "polizas",
        key: "id",
      },
      allowNull: false,
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    });

    await queryInterface.addColumn("municipios", "estadoId", {
      type: Sequelize.INTEGER,
      references: {
        model: "estados",
        key: "id",
      },
      allowNull: false,
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    });

    await queryInterface.addColumn("clientes", "estadoId", {
      type: Sequelize.INTEGER,
      references: {
        model: "estados",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    });

    await queryInterface.addColumn("clientes", "municipioId", {
      type: Sequelize.INTEGER,
      references: {
        model: "municipios",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    });

    await queryInterface.addColumn("polizas", "clienteId", {
      type: Sequelize.INTEGER,
      references: {
        model: "clientes",
        key: "id",
      },
      allowNull: false,
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    });

    await queryInterface.addColumn("polizas", "aseguradoraId", {
      type: Sequelize.INTEGER,
      references: {
        model: "aseguradoras",
        key: "id",
      },
      allowNull: false,
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    });

    await queryInterface.addColumn("polizas", "agenteId", {
      type: Sequelize.INTEGER,
      references: {
        model: "agentes",
        key: "id",
      },
      allowNull: false,
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    });

    await queryInterface.addColumn("polizas", "vendedorId", {
      type: Sequelize.INTEGER,
      references: {
        model: "vendedores",
        key: "id",
      },
      allowNull: false,
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    });

    await queryInterface.addColumn("polizas", "productoId", {
      type: Sequelize.INTEGER,
      references: {
        model: "productos",
        key: "id",
      },
      allowNull: false,
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    });

    await queryInterface.addColumn("recibos", "polizaId", {
      type: Sequelize.INTEGER,
      references: {
        model: "polizas",
        key: "id",
      },
      allowNull: false,
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    });

    await queryInterface.addColumn("recibos", "endosoId", {
      type: Sequelize.INTEGER,
      references: {
        model: "endosos",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    });

    await queryInterface.addColumn("polizas", "renovacionId", {
      type: Sequelize.INTEGER,
      references: {
        model: "polizas",
        key: "id",
      },
    });

    await queryInterface.addColumn("polizas", "reexpedicionId", {
      type: Sequelize.INTEGER,
      references: {
        model: "polizas",
        key: "id",
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("polizas", "reexpedicionId");
    await queryInterface.removeColumn("polizas", "renovacionId");
    await queryInterface.removeColumn("recibos", "endosoId");
    await queryInterface.removeColumn("recibos", "polizaId");
    await queryInterface.removeColumn("polizas", "productoId");
    await queryInterface.removeColumn("polizas", "vendedorId");
    await queryInterface.removeColumn("polizas", "agenteId");
    await queryInterface.removeColumn("polizas", "aseguradoraId");
    await queryInterface.removeColumn("polizas", "clienteId");
    await queryInterface.removeColumn("clientes", "municipioId");
    await queryInterface.removeColumn("clientes", "estadoId");
    await queryInterface.removeColumn("municipios", "estadoId");
    await queryInterface.removeColumn("endosos", "polizaId");
    await queryInterface.removeColumn("agentes", "aseguradoraId");
  },
};
