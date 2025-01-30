const { Aseguradora, Sequelize } = require("../models");
const CustomResponse = require("../utils/CustomResponse");
const ExpressError = require("../utils/ExpressError");
const csv = require("csv-parser");
const { Readable } = require("stream");
const { aseguradoraSchema } = require("../utils/validator");

module.exports.getAseguradoras = async (req, res) => {
  const listOfAseguradoras = await Aseguradora.findAll({
    order: [
      [
        Sequelize.literal(
          `CASE WHEN aseguradora = 'Default' THEN 0 ELSE 1 END`
        ),
        "ASC",
      ],
      ["aseguradora", "ASC"],
    ],
  });

  const response = new CustomResponse(listOfAseguradoras);

  res.status(response.status).json(response);
};

module.exports.getAseguradora = async (req, res) => {
  const aseguradora = await Aseguradora.findByPk(req.params.id);

  if (!aseguradora) throw new ExpressError("aseguradora no encontrada", 404);

  const response = new CustomResponse(aseguradora);

  res.status(response.status).json(response);
};

module.exports.postAseguradora = async (req, res) => {
  const newAseguradora = await Aseguradora.create(req.body);

  const response = new CustomResponse(newAseguradora, 201);

  res.status(response.status).json(response);
};

module.exports.deleteAseguradora = async (req, res) => {
  const aseguradora = await Aseguradora.findByPk(req.params.id);

  if (!aseguradora) throw new ExpressError("aseguradora no encontrada", 404);

  await aseguradora.destroy();

  const response = new CustomResponse(aseguradora);

  res.status(response.status).json(response);
};

module.exports.updateAseguradora = async (req, res) => {
  const aseguradoraUpdate = await Aseguradora.findByPk(req.params.id);

  if (!aseguradoraUpdate)
    throw new ExpressError("aseguradora no encontrada", 404);

  aseguradoraUpdate.set(req.body);

  const updated = await aseguradoraUpdate.save();

  const response = new CustomResponse(updated);

  res.status(response.status).json(response);
};

module.exports.uploadAseguradoras = async (req, res) => {
  if (!req.file) throw new ExpressError("No se ha subido ningún archivo", 400);

  const results = [];
  const errors = [];

  let csvString = req.file.buffer.toString("utf8");
  if (csvString.charCodeAt(0) === 0xfeff) {
    csvString = csvString.slice(1);
  }

  const stream = Readable.from(csvString);

  stream
    .pipe(csv())
    .on("data", (row) => {
      const entry = {
        aseguradora: row.aseguradora,
        plazoPrimer: row.plazoPrimerPago,
        plazoSubsecuentes: row.plazoPagosSubsecuentes,
        comentarios: row.comentarios,
      };
      const { error, value } = aseguradoraSchema.validate(entry);

      if (error) {
        errors.push({ error: error.message, row });
      } else {
        results.push(value);
      }
    })
    .on("end", async () => {
      try {
        await Aseguradora.bulkCreate(results);

        const response = new CustomResponse(
          { results, errors },
          201,
          "Aseguradoras subidas"
        );

        res.status(response.status).json(response);
      } catch (error) {
        throw new ExpressError(error);
      }
    })
    .on("error", (error) => {
      throw new ExpressError(error.message, 400);
    });
};
