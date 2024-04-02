module.exports = (sequelize, DataTypes) => {
  const Estados = sequelize.define(
    "estados",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
        primaryKey: true,
      },
      estado: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
    },
    {
      timestamps: false,
    }
  );

  Estados.associate = (models) => {
    Estados.hasMany(models.municipios, {
      as: "municipios",
      foreignKey: "estadoId",
    });
  };

  return Estados;
};
