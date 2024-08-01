const { Aseguradora, Sequelize } = require("../models");
const CustomResponse = require("../utils/CustomResponse");
const ExpressError = require("../utils/ExpressError");

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
