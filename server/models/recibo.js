"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Recibo extends Model {
    static associate(models) {
      Recibo.belongsTo(models.Poliza, {
        as: "poliza",
        foreignKey: {
          field: "polizaId",
          allowNull: false,
        },
      });
      Recibo.belongsTo(models.Endoso, {
        as: "endoso",
        foreignKey: "endosoId",
      });
    }
  }
  Recibo.init(
    {
      exhibicion: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      de: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      monto: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      fechaInicio: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      fechaLimite: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      fechaPago: DataTypes.DATEONLY,
    },
    {
      sequelize,
      modelName: "Recibo",
      timestamps: false,
    }
  );
  return Recibo;
};
