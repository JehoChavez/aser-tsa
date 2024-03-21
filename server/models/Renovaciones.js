module.exports = (sequelize, DataTypes) => {
  const Renovaciones = sequelize.define("Renovaciones", {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      autoIncrement: true
    }
  })
  // 1 poliza actual
  // 1 poliza renovada
}