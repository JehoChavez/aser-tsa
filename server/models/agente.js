"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Agente extends Model {
    static associate(models) {
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
      nombre: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      comentarios: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Agente",
      timestamps: false,
    }
  );
  return Agente;
};
