module.exports = (sequelize, DataTypes) => {
  const Recibos = sequelize.define("recibos", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
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
    fechaPago: {
      type: DataTypes.DATEONLY,
    },
  });

  Recibos.associate = (models) => {
    Recibos.belongsTo(models.polizas, {
      as: "poliza",
      foreignKey: {
        field: "polizaId",
        allowNull: false,
      },
    });
    Recibos.belongsTo(models.endosos, {
      as: "endoso",
      foreignKey: "endosoId",
    });
  };

  return Recibos;
};
