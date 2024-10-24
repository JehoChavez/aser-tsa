"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Endoso extends Model {
    static associate(models) {
      Endoso.belongsTo(models.Poliza, {
        as: "poliza",
        foreignKey: {
          field: "polizaId",
          allowNull: false,
        },
      });
      Endoso.hasMany(models.Recibo, {
        as: "recibos",
        foreignKey: "endosoId",
        onDelete: "CASCADE",
      });
    }
  }
  Endoso.init(
    {
      endoso: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      emision: DataTypes.DATEONLY,
      inicioVigencia: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      finVigencia: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      tipo: {
        type: DataTypes.STRING,
        validate: {
          isIn: [["A", "B", "D"]],
        },
      },
      primaNeta: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      expedicion: DataTypes.FLOAT,
      financiamiento: DataTypes.FLOAT,
      otros: DataTypes.FLOAT,
      iva: DataTypes.FLOAT,
      primaTotal: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      comentarios: DataTypes.STRING,
      fechaCancelacion: DataTypes.DATEONLY,
    },
    {
      sequelize,
      modelName: "Endoso",
    }
  );
  return Endoso;
};
