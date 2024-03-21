module.exports = (sequelize, DataTypes) => {
  const Agentes = sequelize.define("Agentes", {
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
  // debe tener 1 persona asignada
  // puede tener polizas asignadas
};
