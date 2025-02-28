// Some functions are imported in polizas router
// Polizas controller already has a lot of code
const { Endoso, Poliza, Recibo, sequelize } = require("../models");
const CustomResponse = require("../utils/CustomResponse");
const ExpressError = require("../utils/ExpressError");
const { uploadedEndosoSchema } = require("../utils/validator");
const csv = require("csv-parser");
const { Readable } = require("stream");

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

  const options =
    endosoData.tipo === "B"
      ? null
      : {
          include: {
            model: Recibo,
            as: "recibos",
          },
        };

  // Create endoso and recibos
  const endoso = await Endoso.create(endosoData, options);

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

module.exports.uploadEndosos = async (req, res) => {
  if (!req.file) throw new ExpressError("No se ha subido ningún archivo", 400);

  const results = [];
  const errors = [];

  let csvString = req.file.buffer.toString("utf8");
  if (csvString.charCodeAt(0) === 0xfeff) {
    csvString = csvString.slice(1);
  }

  const stream = Readable.from(csvString);

  const processRow = async (row) => {
    const { error, value } = uploadedEndosoSchema.validate(row);

    if (error) {
      errors.push({ error: error.details[0].message, row });
      return;
    }

    const poliza = await Poliza.findOne({
      where: {
        noPoliza: value.poliza,
      },
    });

    if (!poliza) {
      errors.push({ error: "Póliza no encontrada", row });
      return;
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
          "No se ha creado ningún endoso"
        );
        res.status(response.status).json(response);
      } else {
        const response = new CustomResponse({ results, errors });

        res.status(response.status).json(response);
      }
    });
};
