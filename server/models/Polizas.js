module.exports = (sequelize, DataTypes) => {
  const Polizas = sequelize.define("Polizas", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    poliza: {
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
    bien_asegurado: {
      type: DataTypes.STRING,
      allowNull: false,
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
    moneda: {
      type: DataTypes.STRING,
      validate: {
        isIn: [["MXN", "USD", "UDI"]],
      },
    },
    forma_pago: {
      type: DataTypes.STRING,
      validate: {
        isIn: [["c", "s", "t", "m"]],
      },
    },
    comentarios: {
      type: DataTypes.STRING,
    },
  });
  // 1 cliente
  // 1 aseguradora
  // 1 producto
  // 1 agente
  // puede tener endosos
  // 1 o mas pagos
  // puede tener renovaciones

  // Eliminar polizas luego de 5 años
};
