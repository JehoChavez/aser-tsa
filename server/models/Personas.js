module.exports = (sequelize, DataTypes) => {
  const Personas = sequelize.define(
    "personas",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
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
      fechaDeNacimiento: {
        type: DataTypes.DATEONLY,
      },
      rfc: {
        type: DataTypes.STRING,
      },
      calle: {
        type: DataTypes.STRING,
      },
      numeroExterior: {
        type: DataTypes.STRING,
      },
      numeroInterior: {
        type: DataTypes.STRING,
      },
      colonia: {
        type: DataTypes.STRING,
      },
      codigoPostal: {
        type: DataTypes.STRING,
      },
      correoElectronico: {
        type: DataTypes.STRING,
      },
      telefono: {
        type: DataTypes.STRING,
      },
      empresa: {
        type: DataTypes.STRING,
      },
      comentarios: {
        type: DataTypes.STRING,
      },
    },
    {
      timestamps: false,
    }
  );

  Personas.associate = (models) => {
    Personas.hasOne(models.clientes, {
      as: "cliente",
      onDelete: "CASCADE",
    });
    Personas.hasOne(models.agentes, {
      as: "agente",
      onDelete: "CASCADE",
    });
    Personas.hasOne(models.vendedores, {
      as: "vendedor",
      onDelete: "CASCADE",
    });
    Personas.belongsTo(models.estados, {
      as: "estado",
    });
    Personas.belongsTo(models.municipios, {
      as: "municipio",
    });
  };

  return Personas;
};
