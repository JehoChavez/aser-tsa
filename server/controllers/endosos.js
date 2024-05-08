// Some functions are imported in polizas router
// Polizas controller already has a lot of code
const { Endoso, Poliza, Recibo, sequelize } = require("../models");
const CustomResponse = require("../utils/CustomResponse");
const ExpressError = require("../utils/ExpressError");

module.exports.getEndosos = async (req, res) => {
  const listOfEndosos = await Endoso.findAll({
    where: {
      polizaId: req.params.id,
    },
  });

  const response = new CustomResponse(listOfEndosos);

  res.json(response);
};

module.exports.getEndoso = async (req, res) => {
  const endoso = await Endoso.findByPk(req.params.id);

  if (!endoso) throw new ExpressError("endoso no encontrado", 404);

  const response = new CustomResponse(endoso);

  res.json(response);
};

module.exports.postEndoso = async (req, res) => {
  const endosoData = req.body.endoso;
  const recibosData = req.body.recibos;

  const poliza = await Poliza.findByPk(endosoData.polizaId);

  if (!poliza) throw new ExpressError("poliza no encontrada", 404);

  const existingEndoso = await Endoso.findOne({
    where: {
      endoso: endosoData.endoso,
      polizaId: endosoData.polizaId,
    },
  });

  if (existingEndoso) throw new ExpressError("endoso ya existe", 400);

  const t = await sequelize.transaction();

  try {
    const endoso = await Endoso.create(endosoData, { transaction: t });

    const responseBody = { endoso };

    if (recibosData) {
      const recibos = await Promise.all(
        recibosData.map(async (reciboData) => {
          const recibo = await Recibo.create(
            { ...reciboData, polizaId: poliza.id, endosoId: endoso.id },
            { transaction: t }
          );
          return recibo;
        })
      );
      responseBody.recibos = recibos;
    }

    await t.commit();

    const response = new CustomResponse(responseBody, 201);

    res.json(response);
  } catch (error) {
    await t.rollback();

    throw new ExpressError(error);
  }
};

module.exports.deleteEndoso = async (req, res) => {
  const endoso = await Endoso.findByPk(req.params.id);

  if (!endoso) throw new ExpressError("endoso no encontrado", 404);

  const deleted = await endoso.destroy();

  const response = new CustomResponse(deleted);

  res.json(response);
};
