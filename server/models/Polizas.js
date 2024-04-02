module.exports = (sequelize, DataTypes) => {
  const Polizas = sequelize.define("polizas", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    poliza: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    emision: {
      type: DataTypes.DATEONLY,
    },
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
    expedicion: {
      type: DataTypes.FLOAT,
    },
    financiamiento: {
      type: DataTypes.FLOAT,
    },
    iva: {
      type: DataTypes.FLOAT,
    },
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
    comentarios: {
      type: DataTypes.STRING,
    },
    fechaCancelacion: {
      type: DataTypes.DATEONLY,
    },
  });

  Polizas.associate = (models) => {
    Polizas.belongsTo(models.clientes, {
      as: "cliente",
      foreignKey: {
        field: "clienteId",
        allowNull: false,
      },
    });
    Polizas.belongsTo(models.aseguradoras, {
      as: "aseguradora",
      foreignKey: {
        field: "aseguradoraId",
        allowNull: false,
      },
    });
    Polizas.belongsTo(models.agentes, {
      as: "agente",
      foreignKey: {
        field: "agenteId",
        allowNull: false,
      },
    });
    Polizas.belongsTo(models.vendedores, {
      as: "vendedor",
      foreignKey: {
        field: "vendedorId",
        allowNull: false,
      },
    });
    Polizas.belongsTo(models.productos, {
      as: "producto",
      foreignKey: {
        field: "productoId",
        allowNull: false,
      },
    });
    Polizas.hasMany(models.endosos, {
      as: "endosos",
      foreignKey: "polizaId",
      onDelete: "CASCADE",
    });
    Polizas.hasMany(models.recibos, {
      as: "recibos",
      foreignKey: "polizaId",
      onDelete: "CASCADE",
    });
    Polizas.hasOne(models.polizas, {
      as: "renovacion",
      onDelete: "SET NULL",
    });
    Polizas.hasOne(models.polizas, {
      as: "reexpedicion",
      onDelete: "SET NULL",
    });
  };

  return Polizas;
};
