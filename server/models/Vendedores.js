module.exports = (sequelize, DataTypes) => {
  const Vendedores = sequelize.define("Vendedores", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    comentarios: {
      type: DataTypes.STRING,
    },
  });
  // debe tener 1 persona asignada
  // puede tener polizas asignadas
};
