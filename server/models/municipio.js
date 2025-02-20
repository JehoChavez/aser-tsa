"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Municipio extends Model {
    static associate(models) {
      Municipio.belongsTo(models.Estado, {
        as: "estado",
        foreignKey: "estadoId",
        onDelete: "CASCADE",
      });
    }
  }
  Municipio.init(
    {
      municipio: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      estadoId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Municipio",
      timestamps: false,
    }
  );
  return Municipio;
};
