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
        field: "personaId",
        allowNull: false,
      },
    });
    Clientes.hasMany(models.polizas, {
      as: "polizas",
      foreignKey: "clienteId",
      onDelete: "CASCADE",
    });
  };

  return Clientes;
};
