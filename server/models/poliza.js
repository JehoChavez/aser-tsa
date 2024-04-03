"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Poliza extends Model {
    static associate(models) {
      Poliza.belongsTo(models.Cliente, {
        as: "cliente",
        foreignKey: {
          field: "clienteId",
          allowNull: false,
        },
      });
      Poliza.belongsTo(models.Aseguradora, {
        as: "aseguradora",
        foreignKey: {
          field: "aseguradoraId",
          allowNull: false,
        },
      });
      Poliza.belongsTo(models.Agente, {
        as: "agente",
        foreignKey: {
          field: "agenteId",
          allowNull: false,
        },
      });
      Poliza.belongsTo(models.Vendedor, {
        as: "vendedor",
        foreignKey: {
          field: "vendedorId",
          allowNull: false,
        },
      });
      Poliza.belongsTo(models.Producto, {
        as: "producto",
        foreignKey: {
          field: "productoId",
          allowNull: false,
        },
      });
      Poliza.hasMany(models.Endoso, {
        as: "endosos",
        foreignKey: "polizaId",
        onDelete: "CASCADE",
      });
      Poliza.hasMany(models.Recibo, {
        as: "recibos",
        foreignKey: "polizaId",
        onDelete: "CASCADE",
      });
      Poliza.hasOne(models.Poliza, {
        as: "renovacion",
        onDelete: "SET NULL",
      });
      Poliza.hasOne(models.Poliza, {
        as: "reexpedicion",
        onDelete: "SET NULL",
      });
    }
  }
  Poliza.init(
    {
      poliza: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      emision: DataTypes.STRING,
      inicioVigencia: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      finVigencia: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      bienAsegurado: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      primaNeta: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      expedicion: DataTypes.FLOAT,
      financiamiento: DataTypes.FLOAT,
      iva: DataTypes.FLOAT,
      primaTotal: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      moneda: {
        type: DataTypes.STRING,
        validate: {
          isIn: [["MXN", "USD", "UDI"]],
        },
      },
      formaPago: {
        type: DataTypes.STRING,
        validate: {
          isIn: [["c", "s", "t", "m"]],
        },
      },
      comentarios: DataTypes.STRING,
      fechaCancelacion: DataTypes.DATEONLY,
    },
    {
      sequelize,
      modelName: "Poliza",
    }
  );
  return Poliza;
};
