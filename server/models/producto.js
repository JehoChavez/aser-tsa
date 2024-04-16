"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Producto extends Model {
    static associate(models) {
      Producto.hasMany(models.Poliza, {
        as: "polizas",
        foreignKey: "productoId",
        onDelete: "CASCADE",
      });
    }
  }
  Producto.init(
    {
      producto: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Producto",
      timestamps: false,
    }
  );
  return Producto;
};
