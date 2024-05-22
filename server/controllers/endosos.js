// Some functions are imported in polizas router
// Polizas controller already has a lot of code
const { Endoso, Poliza, Recibo, sequelize } = require("../models");
const CustomResponse = require("../utils/CustomResponse");
const ExpressError = require("../utils/ExpressError");

// Get endosos by poliza
module.exports.getEndosos = async (req, res) => {
  const listOfEndosos = await Endoso.findAll({
    where: {
      polizaId: req.params.id,
    },
  });

  const response = new CustomResponse(listOfEndosos);

  res.status(response.status).json(response);
};

module.exports.getEndoso = async (req, res) => {
  const endoso = await Endoso.findByPk(req.params.id, {
    include: [
      {
        model: Recibo,
        as: "recibos",
      },
    ],
  });

  if (!endoso) throw new ExpressError("endoso no encontrado", 404);

  const response = new CustomResponse(endoso);

  res.status(response.status).json(response);
};

module.exports.postEndoso = async (req, res) => {
  const endosoData = req.body.endoso;
  const recibosData = req.body.recibos;

  const poliza = await Poliza.findByPk(endosoData.polizaId);

  if (!poliza) throw new ExpressError("poliza no encontrada", 404);

  // Set recibos polizaId to the poliza ID and endoso recibos to recibosData
  if (recibosData) {
    endosoData.recibos = recibosData.map((recibo) => {
      recibo.polizaId = poliza.id;
      return recibo;
    });
  }

  // Check if endoso already exists
  const existingEndoso = await Endoso.findOne({
    where: {
      endoso: endosoData.endoso,
      polizaId: endosoData.polizaId,
    },
  });

  if (existingEndoso) throw new ExpressError("endoso ya existe", 400);

  // Create endoso and recibos
  const endoso = await Endoso.create(endosoData, {
    include: {
      model: Recibo,
      as: "recibos",
    },
  });

  const response = new CustomResponse(endoso, 201);

  res.status(response.status).json(response);
};

module.exports.deleteEndoso = async (req, res) => {
  const endoso = await Endoso.findByPk(req.params.id);

  if (!endoso) throw new ExpressError("endoso no encontrado", 404);

  const deleted = await endoso.destroy();

  const response = new CustomResponse(deleted);

  res.status(response.status).json(response);
};

module.exports.updateEndoso = async (req, res) => {
  const endosoData = req.body.endoso;
  const recibosData = req.body.recibos;

  const endoso = await Endoso.findByPk(req.params.id);

  if (!endoso) throw new ExpressError("endoso no encontrado", 404);

  const poliza = await Poliza.findByPk(endosoData.polizaId);

  if (!poliza) throw new ExpressError("poliza no encontrada", 404);

  const t = await sequelize.transaction();

  try {
    // Delete recibos
    await Recibo.destroy({
      where: {
        endosoId: endoso.id,
      },
      transaction: t,
    });

    // Update endoso
    endoso.set(endosoData);

    const updatedEndoso = await endoso.save({ transaction: t });

    // Create new recibos
    const recibos = await Promise.all(
      recibosData.map(async (reciboData) => {
        const recibo = await Recibo.create(
          {
            ...reciboData,
            polizaId: poliza.id,
            endosoId: updatedEndoso.id,
          },
          { transaction: t }
        );
        return recibo;
      })
    );

    await t.commit();

    const response = new CustomResponse({ updatedEndoso, recibos });

    res.status(response.status).json(response);
  } catch (error) {
    await t.rollback();

    throw new ExpressError();
  }
};
