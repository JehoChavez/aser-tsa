"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("agentes", "personaId", {
      type: Sequelize.INTEGER,
      references: {
        model: "personas",
        key: "id",
      },
      allowNull: false,
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    });

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

    await queryInterface.addColumn("clientes", "personaId", {
      type: Sequelize.INTEGER,
      references: {
        model: "personas",
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

    await queryInterface.addColumn("personas", "estadoId", {
      type: Sequelize.INTEGER,
      references: {
        model: "estados",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    });

    await queryInterface.addColumn("personas", "municipioId", {
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

    await queryInterface.addColumn("vendedores", "personaId", {
      type: Sequelize.INTEGER,
      references: {
        model: "personas",
        key: "id",
      },
      allowNull: false,
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("agentes", "personaId");
    await queryInterface.removeColumn("agentes", "aseguradoraId");
    await queryInterface.removeColumn("clientes", "personaId");
    await queryInterface.removeColumn("endosos", "polizaId");
    await queryInterface.removeColumn("municipios", "estadoId");
    await queryInterface.removeColumn("personas", "estadoId");
    await queryInterface.removeColumn("personas", "municipioId");
    await queryInterface.removeColumn("polizas", "clienteId");
    await queryInterface.removeColumn("polizas", "aseguradoraId");
    await queryInterface.removeColumn("polizas", "agenteId");
    await queryInterface.removeColumn("polizas", "vendedorId");
    await queryInterface.removeColumn("polizas", "productoId");
    await queryInterface.removeColumn("recibos", "polizaId");
    await queryInterface.removeColumn("recibos", "endosoId");
    await queryInterface.removeColumn("vendedores", "personaId");
  },
};
