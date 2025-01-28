"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Cliente extends Model {
    static associate(models) {
      Cliente.belongsTo(models.Estado, {
        as: "estado",
        foreignKey: "estadoId",
      });
      Cliente.belongsTo(models.Municipio, {
        as: "municipio",
        foreignKey: "municipioId",
      });
    }
  }
  Cliente.init(
    {
      tipoPersona: {
        type: DataTypes.STRING,
        validate: {
          isIn: [["fisica", "moral"]],
        },
      },
      sexo: {
        type: DataTypes.STRING,
        validate: {
          isIn: [["m", "f"]],
        },
      },
      nombre: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      nacimiento: DataTypes.DATEONLY,
      rfc: DataTypes.STRING,
      calle: DataTypes.STRING,
      exterior: DataTypes.STRING,
      interior: DataTypes.STRING,
      colonia: DataTypes.STRING,
      codigoPostal: DataTypes.STRING,
      correo: DataTypes.STRING,
      telefono: DataTypes.STRING,
      empresa: DataTypes.STRING,
      comentarios: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Cliente",
    }
  );
  return Cliente;
};
