module.exports = (sequelize, DataTypes) => {
  const Clientes = sequelize.define("clientes", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    comentarios: {
      type: DataTypes.STRING,
    },
  });

  Clientes.associate = (models) => {
    Clientes.belongsTo(models.personas, {
      as: "persona",
      foreignKey: {
        allowNull: false,
      },
    });
    Clientes.hasMany(models.polizas, {
      as: "polizas",
      onDelete: "CASCADE",
    });
  };

  return Clientes;
};
