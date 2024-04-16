"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Estado extends Model {
    static associate(models) {
      Estado.hasMany(models.Municipio, {
        as: "municipios",
        foreignKey: "estadoId",
      });
    }
  }
  Estado.init(
    {
      estado: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
    },
    {
      sequelize,
      modelName: "Estado",
      timestamps: false,
    }
  );
  return Estado;
};
