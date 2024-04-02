module.exports = (sequelize, DataTypes) => {
  const Vendedores = sequelize.define("vendedores", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    comentarios: {
      type: DataTypes.STRING,
    },
  });

  Vendedores.associate = (models) => {
    Vendedores.belongsTo(models.personas, {
      as: "persona",
      foreignKey: {
        field: "personaId",
        allowNull: false,
      },
    });
    Vendedores.hasMany(models.polizas, {
      as: "polizas",
      foreignKey: "vendedorId",
      onDelete: "CASCADE",
    });
  };

  return Vendedores;
};
