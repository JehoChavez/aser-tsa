module.exports = (sequelize, DataTypes) => {
  const Municipios = sequelize.define(
    "Municipios",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        unique: true,
        primaryKey: true,
      },
      municipio: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      id_estado: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Estados",
          key: "id",
        },
      },
    },
    {
      timestamps: false,
    }
  );
  return Municipios;
};
