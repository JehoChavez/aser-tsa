"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Agente extends Model {
    static associate(models) {
      Agente.belongsTo(models.Persona, {
        as: "persona",
        foreignKey: {
          field: "personaId",
          allowNull: false,
        },
      });
      Agente.belongsTo(models.Aseguradora, {
        as: "aseguradora",
        foreignKey: {
          field: "aseguradoraId",
          allowNull: false,
        },
      });
      Agente.hasMany(models.Poliza, {
        as: "polizas",
        foreignKey: "agenteId",
        onDelete: "CASCADE",
      });
    }
  }
  Agente.init(
    {
      clave: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      comentarios: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Agente",
    }
  );
  return Agente;
};
