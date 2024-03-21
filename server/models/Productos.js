module.exports = (sequelize, DataTypes) => {
  const Productos = sequelize.define(
    "Productos",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      producto: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      timeStamps: false,
    }
  );
};
