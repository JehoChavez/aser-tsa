module.exports = (sequelize, DataTypes) => {
  const Agentes = sequelize.define("agentes", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    clave: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    comentarios: {
      type: DataTypes.STRING,
    },
  });

  Agentes.associate = (models) => {
    Agentes.belongsTo(models.personas, {
      as: "persona",
      foreignKey: {
        allowNull: false,
      },
    });
    Agentes.belongsTo(models.aseguradoras, {
      as: "aseguradora",
      foreignKey: {
        allowNull: false,
      },
    });
    Agentes.hasMany(models.polizas, {
      as: "polizas",
      onDelete: "CASCADE",
    });
  };

  return Agentes;
};
