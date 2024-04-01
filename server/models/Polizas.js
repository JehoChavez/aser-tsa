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
      allowNull: false,
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
        allowNull: false,
      },
    });
    Polizas.belongsTo(models.aseguradoras, {
      as: "aseguradora",
      foreignKey: {
        allowNull: false,
      },
    });
    Polizas.belongsTo(models.agentes, {
      as: "agente",
      foreignKey: {
        allowNull: false,
      },
    });
    Polizas.belongsTo(models.vendedores, {
      as: "vendedor",
      foreignKey: {
        allowNull: false,
      },
    });
    Polizas.belongsTo(models.productos, {
      as: "producto",
      foreignKey: {
        allowNull: false,
      },
    });
    Polizas.hasMany(models.endosos, {
      as: "endosos",
      onDelete: "CASCADE",
    });
    Polizas.hasMany(models.recibos, {
      as: "recibos",
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
