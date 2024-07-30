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
        },
      });
      Poliza.belongsTo(models.Ramo, {
        as: "ramo",
        foreignKey: {
          field: "ramoId",
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
        as: "renueva",
        foreignKey: {
          field: "renovacionId",
        },
      });
      Poliza.hasOne(models.Poliza, {
        as: "reexpide",
        foreignKey: {
          field: "reexpedicionId",
        },
      });
      Poliza.belongsTo(models.Poliza, {
        as: "renovacion",
        foreignKey: {
          field: "renovacionId",
        },
      });
      Poliza.belongsTo(models.Poliza, {
        as: "reexpedicion",
        foreignKey: {
          field: "reexpedicionId",
        },
      });
    }
  }
  Poliza.init(
    {
      noPoliza: {
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
      otros: DataTypes.FLOAT,
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
        type: DataTypes.INTEGER,
        validate: {
          isIn: [[1, 2, 4, 12]],
        },
      },
      comentarios: DataTypes.STRING,
      fechaCancelacion: DataTypes.DATEONLY,
      vencida: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Poliza",
    }
  );
  return Poliza;
};
