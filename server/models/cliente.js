"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Cliente extends Model {
    static associate(models) {
      Cliente.belongsTo(models.Persona, {
        as: "persona",
        foreignKey: {
          field: "personaId",
          allowNull: false,
        },
      });
      Cliente.hasMany(models.Poliza, {
        as: "polizas",
        foreignKey: "clienteId",
        onDelete: "CASCADE",
      });
    }
  }
  Cliente.init(
    {
      comentarios: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Cliente",
    }
  );
  return Cliente;
};
