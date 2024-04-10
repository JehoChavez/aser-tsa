"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Vendedor extends Model {
    static associate(models) {
      Vendedor.hasMany(models.Poliza, {
        as: "polizas",
        foreignKey: "vendedorId",
        onDelete: "CASCADE",
      });
    }
  }
  Vendedor.init(
    {
      nombre: {
        allowNull: false,
        unique: true,
        type: DataTypes.STRING,
      },
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
