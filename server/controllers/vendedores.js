const { Vendedor, Sequelize, sequelize } = require("../models");
const ExpressError = require("../utils/ExpressError");
const CustomResponse = require("../utils/CustomResponse");
const csv = require("csv-parser");
const { Readable } = require("stream");
const { vendedorSchema } = require("../utils/validator");

module.exports.getVendedores = async (req, res) => {
  const listOfVendedores = await Vendedor.findAll({
    order: [
      [
        Sequelize.literal(`CASE WHEN nombre = 'Default' THEN 0 ELSE 1 END`),
        "ASC",
      ],
      ["nombre", "ASC"],
    ],
  });

  const response = new CustomResponse(listOfVendedores);

  res.status(response.status).json(response);
};

module.exports.getVendedor = async (req, res) => {
  const vendedor = await Vendedor.findByPk(req.params.id);

  if (!vendedor) throw new ExpressError("vendedor no encontrado", 404);

  const response = new CustomResponse(vendedor);

  res.status(response.status).json(response);
};

module.exports.postVendedor = async (req, res) => {
  const nuevoVendedor = await Vendedor.create(req.body);

  const response = new CustomResponse(nuevoVendedor, 201);

  res.status(response.status).json(response);
};

module.exports.deleteVendedor = async (req, res) => {
  const vendedor = await Vendedor.findByPk(req.params.id);

  if (!vendedor) throw new ExpressError("Vendedor no encontrado", 404);

  await vendedor.destroy();

  const response = new CustomResponse(vendedor);

  res.status(response.status).json(response);
};

module.exports.updateVendedor = async (req, res) => {
  const vendedor = await Vendedor.findByPk(req.params.id);

  if (!vendedor) throw new ExpressError("Vendedor no encontrado", 404);

  vendedor.set(req.body);

  const updated = await vendedor.save();

  const response = new CustomResponse(updated);

  res.status(response.status).json(response);
};

module.exports.uploadVendedores = async (req, res) => {
  if (!req.file) throw new ExpressError("No se subió archivo", 400);

  const results = [];
  const errors = [];

  let csvString = req.file.buffer.toString("utf8");
  if (csvString.charCodeAt(0) === 0xfeff) {
    csvString = csvString.slice(1);
  }

  const stream = Readable.from(csvString);

  const processRow = async (row) => {
    const { error, value } = vendedorSchema.validate(row);

    if (error) {
      errors.push({ error: error.details[0].message, row });
    } else {
      const t = await sequelize.transaction();

      try {
        const existingVendedor = await Vendedor.findOne({
          where: {
            nombre: value.nombre,
          },
          transaction: t,
        });

        if (existingVendedor) {
          errors.push({
            error: `Vendedor ${value.nombre} ya existe`,
            row,
          });
        } else {
          const newVendedor = await Vendedor.create(value, {
            transaction: t,
          });

          if (newVendedor) results.push(newVendedor);
        }

        await t.commit();
      } catch (error) {
        await t.rollback();
        errors.push({ error: error.message, row });
      }
    }
  };

  const promises = [];

  stream
    .pipe(csv())
    .on("data", (row) => {
      promises.push(processRow(row));
    })
    .on("error", (error) => {
      throw new ExpressError(error.message, 400);
    })
    .on("end", async () => {
      await Promise.all(promises);

      if (results.length === 0) {
        const response = new CustomResponse(
          { errors },
          400,
          "No se ha creado ningún vendedor"
        );
        res.status(response.status).json(response);
      } else {
        const response = new CustomResponse({ results, errors });

        res.status(response.status).json(response);
      }
    });
};
