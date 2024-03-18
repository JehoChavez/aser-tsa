module.exports = (sequelize, DataTypes) => {
  const Estados = sequelize.define(
    "Estados",
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
  return Estados;
};
