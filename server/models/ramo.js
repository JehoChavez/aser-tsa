"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Ramo extends Model {
    static associate(models) {
      Ramo.hasMany(models.Poliza, {
        as: "polizas",
        foreignKey: "ramoId",
        onDelete: "CASCADE",
      });
    }
  }
  Ramo.init(
    {
      ramo: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Ramo",
      timestamps: false,
    }
  );
  return Ramo;
};
