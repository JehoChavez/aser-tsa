module.exports = (sequelize, DataTypes) => {
  const Clientes = sequelize.define("Clientes", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    comentarios: {
      type: DataTypes.STRING,
    },
  });
  // 1 persona
  // varias polizas
};
