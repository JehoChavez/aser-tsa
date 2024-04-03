"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Municipio extends Model {
    static associate(models) {
      Municipio.belongsTo(models.Estado, {
        as: "estado",
        foreignKey: "estadoId",
      });
    }
  }
  Municipio.init(
    {
      municipio: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "Municipio",
    }
  );
  return Municipio;
};
