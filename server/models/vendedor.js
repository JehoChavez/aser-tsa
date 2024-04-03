"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Vendedor extends Model {
    static associate(models) {
      Vendedor.belongsTo(models.Persona, {
        as: "persona",
        foreignKey: {
          field: "personaId",
          allowNull: false,
        },
      });
      Vendedor.hasMany(models.Poliza, {
        as: "polizas",
        foreignKey: "vendedorId",
        onDelete: "CASCADE",
      });
    }
  }
  Vendedor.init(
    {
      comentarios: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Vendedor",
      tableName: "vendedores",
    }
  );
  return Vendedor;
};
