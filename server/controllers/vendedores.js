const { Vendedor, Sequelize } = require("../models");
const ExpressError = require("../utils/ExpressError");
const CustomResponse = require("../utils/CustomResponse");

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
