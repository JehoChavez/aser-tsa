module.exports = (sequelize, DataTypes) => {
  const Productos = sequelize.define(
    "productos",
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

  Productos.associate = (models) => {
    Productos.hasMany(models.polizas, {
      as: "polizas",
      foreignKey: "productoId",
      onDelete: "CASCADE",
    });
  };

  return Productos;
};
