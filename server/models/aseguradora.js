"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Aseguradora extends Model {
    static associate(models) {
      Aseguradora.hasMany(models.Agente, {
        as: "agentes",
        foreignKey: "aseguradoraId",
        onDelete: "CASCADE",
      });
      Aseguradora.hasMany(models.Poliza, {
        as: "polizas",
        foreignKey: "aseguradoraId",
        onDelete: "CASCADE",
      });
    }
  }
  Aseguradora.init(
    {
      aseguradora: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      plazoPrimer: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      plazoSubsecuentes: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      comentarios: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Aseguradora",
      timestamps: false,
    }
  );
  return Aseguradora;
};
