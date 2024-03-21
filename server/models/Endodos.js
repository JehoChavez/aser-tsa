module.exports = (sequelize, DataTypes) => {
  const Endosos = sequelize.define("Endosos", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    endoso: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    emision: {
      type: DataTypes.DATEONLY,
    },
    inicio_vigencia: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    fin_vigencia: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    tipo: {
      type: DataTypes.STRING,
      validate: {
        isIn: [["A", "B", "D"]],
      },
    },
    prima_neta: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    expedicion: {
      type: DataTypes.FLOAT,
    },
    financiamiento: {
      type: DataTypes.FLOAT,
    },
    iva: {
      type: DataTypes.FLOAT,
    },
    prima_total: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    comentarios: {
      type: DataTypes.STRING,
    },
  });
  // 1 poliza
  // puede tener pagos
};
