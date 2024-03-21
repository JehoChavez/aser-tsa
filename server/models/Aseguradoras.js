module.exports = (sequelize, DataTypes) => {
  const Aseguradoras = sequelize.define("Aseguradoras", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    aseguradora: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    plazo_primer: {
      type: DataTypes.INTEGER,
    },
    plazo_subsecuentes: {
      type: DataTypes.INTEGER,
    },
    comentarios: {
      type: DataTypes.STRING,
    },
  });
  // Puede tener varios agentes
};
