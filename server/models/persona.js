"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Persona extends Model {
    static associate(models) {
      Persona.hasOne(models.Cliente, {
        as: "cliente",
        foreignKey: "personaId",
        onDelete: "CASCADE",
      });
      Persona.hasOne(models.Agente, {
        as: "agente",
        foreignKey: "personaId",
        onDelete: "CASCADE",
      });
      Persona.hasOne(models.Vendedor, {
        as: "vendedor",
        foreignKey: "personaId",
        onDelete: "CASCADE",
      });
      Persona.belongsTo(models.Estado, {
        as: "estado",
        foreignKey: "estadoId",
      });
      Persona.belongsTo(models.Municipio, {
        as: "municipio",
        foreignKey: "municipioId",
      });
    }
  }
  Persona.init(
    {
      tipoPersona: {
        type: DataTypes.STRING,
        validate: {
          isIn: [["fisica", "moral"]],
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
      modelName: "Persona",
    }
  );
  return Persona;
};
