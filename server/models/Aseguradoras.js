module.exports = (sequelize, DataTypes) => {
  const Aseguradoras = sequelize.define("aseguradoras", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    aseguradora: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    plazoPrimer: {
      type: DataTypes.INTEGER,
    },
    plazoSubsecuentes: {
      type: DataTypes.INTEGER,
    },
    comentarios: {
      type: DataTypes.STRING,
    },
  });

  Aseguradoras.associate = (models) => {
    Aseguradoras.hasMany(models.agentes, {
      as: "agentes",
      foreignKey: "aseguradoraId",
      onDelete: "CASCADE",
    });
    Aseguradoras.hasMany(models.polizas, {
      as: "polizas",
      foreignKey: "aseguradoraId",
      onDelete: "CASCADE",
    });
  };

  return Aseguradoras;
};
