module.exports = (sequelize, DataTypes) => {
  const Personas = sequelize.define(
    "Personas",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      persona: {
        type: DataTypes.STRING,
        validate: {
          isIn: [["fisica", "moral"]],
        },
      },
      nombre: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      fecha_de_nacimiento: {
        type: DataTypes.DATEONLY,
      },
      rfc: {
        type: DataTypes.STRING,
      },
      calle: {
        type: DataTypes.STRING,
      },
      numero_exterior: {
        type: DataTypes.STRING,
      },
      numero_interior: {
        type: DataTypes.STRING,
      },
      colonia: {
        type: DataTypes.STRING,
      },
      codigo_postal: {
        type: DataTypes.STRING,
      },
      id_estado: {
        type: DataTypes.INTEGER,
        references: {
          model: "Estados",
          key: "id",
        },
      },
      id_municipio: {
        type: DataTypes.INTEGER,
        references: {
          model: "Municipios",
          key: "id",
        },
      },
      correo_electronico: {
        type: DataTypes.STRING,
      },
      telefono: {
        type: DataTypes.STRING,
      },
      empresa: {
        type: DataTypes.STRING,
      },
      comentarios: {
        type: DataTypes.STRING,
      },
    },
    {
      timestamps: false,
    }
  );
  // 1 cliente
  // 1 agente
  // 1 vendedor
};
