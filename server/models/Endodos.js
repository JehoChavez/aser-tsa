module.exports = (sequelize, DataTypes) => {
  const Endosos = sequelize.define("endosos", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    endoso: {
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
    comentarios: {
      type: DataTypes.STRING,
    },
  });

  Endosos.associate = (models) => {
    Endosos.belongsTo(models.polizas, {
      as: "poliza",
      foreignKey: {
        allowNull: false,
      },
    });
    Endosos.hasMany(models.recibos, {
      as: "recibos",
      onDelete: "CASCADE",
    });
  };

  return Endosos;
};
