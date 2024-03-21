module.exports = (sequelize, DataTypes) => {
  const Vendedores = sequelize.define("Vendedores", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
  });
  // debe tener 1 persona asignada
  // puede tener polizas asignadas
};
