module.exports = (sequelize, DataTypes) => {
  const Municipios = sequelize.define(
    "municipios",
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
    },
    {
      timestamps: false,
    }
  );

  Municipios.associate = (models) => {
    Municipios.belongsTo(models.estados, {
      as: "estado",
      foreignKey: "estadoId",
    });
  };

  return Municipios;
};
