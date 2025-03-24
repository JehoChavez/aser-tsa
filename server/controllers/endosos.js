// Some functions are imported in polizas router
// Polizas controller already has a lot of code
const { Endoso, Poliza, Recibo, Aseguradora, sequelize } = require("../models");
const CustomResponse = require("../utils/CustomResponse");
const ExpressError = require("../utils/ExpressError");
const { uploadedEndosoSchema } = require("../utils/validator");
const csv = require("csv-parser");
const { Readable } = require("stream");
const moment = require("moment");

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

  const t = await sequelize.transaction();
  try {
    const poliza = await Poliza.findByPk(endosoData.polizaId, {
      transaction: t,
    });

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
      transaction: t,
    });

    if (existingEndoso) throw new ExpressError("endoso ya existe", 400);

    const options =
      endosoData.tipo === "B"
        ? {
            transaction: t,
          }
        : {
            include: {
              model: Recibo,
              as: "recibos",
            },
            transaction: t,
          };

    // Create endoso and recibos
    const endoso = await Endoso.create(endosoData, options);

    const response = new CustomResponse(endoso, 201);

    await t.commit();
    res.status(response.status).json(response);
  } catch (error) {
    await t.rollback();
    const response = new CustomResponse(error.message, 500, error.message);
    res.status(response.status).json(response);
  }
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

    const t = await sequelize.transaction();

    try {
      const poliza = await Poliza.findOne({
        where: {
          noPoliza: value.poliza,
        },
        include: [
          {
            model: Aseguradora,
            as: "aseguradora",
            attributes: ["plazoPrimer", "plazoSubsecuentes"],
          },
        ],
        transaction: t,
      });

      if (!poliza) {
        errors.push({ error: "Póliza no encontrada", row });
        return;
      }

      const existingEndoso = await Endoso.findOne({
        where: {
          endoso: value.endoso,
          polizaId: poliza.id,
        },
        transaction: t,
      });

      if (existingEndoso) {
        errors.push({ error: "Endoso ya existe", row });
        return;
      }

      if (value.expedicion === "") value.expedicion = 0;
      if (value.financiamiento === "") value.financiamiento = 0;
      if (value.otros === "") value.otros = 0;
      if (value.iva === "") value.iva = 0;

      if (value.emision) {
        value.emision = value.emision.split("/").reverse().join("-");
      }

      if (!value.inicioVigencia) {
        value.inicioVigencia = poliza.inicioVigencia;
      } else {
        value.inicioVigencia = value.inicioVigencia
          .split("/")
          .reverse()
          .join("-");
      }
      if (!value.finVigencia) {
        value.finVigencia = poliza.finVigencia;
      } else {
        value.finVigencia = value.finVigencia.split("/").reverse().join("-");
      }

      const endoso = await Endoso.create(
        {
          polizaId: poliza.id,
          endoso: value.endoso,
          emision: value.emision,
          inicioVigencia: value.inicioVigencia,
          finVigencia: value.finVigencia,
          tipo: value.tipo,
          primaNeta: value.primaNeta,
          expedicion: value.expedicion,
          financiamiento: value.financiamient,
          otros: value.otros,
          iva: value.iva,
          primaTotal: value.primaTotal,
          concepto: value.concepto,
        },
        { transaction: t }
      );

      const polizaInicio = moment(poliza.inicioVigencia)
        .hour(0)
        .minute(0)
        .second(0);

      const endosoInicio = moment(value.inicioVigencia)
        .hour(0)
        .minute(0)
        .second(0);
      const endosoFin = moment(value.finVigencia).hour(0).minute(0).second(0);

      const monthDiff = Math.ceil(endosoFin.diff(endosoInicio, "months", true));

      const nrOfRecibos = Math.ceil((monthDiff * poliza.formaPago) / 12);

      const monthsSinceInicio = Math.floor(
        endosoInicio.diff(polizaInicio, "months", true)
      );

      const pastRecibos = Math.ceil(
        (monthsSinceInicio * poliza.formaPago) / 12
      );

      let primaNeta = value.primaNeta;
      let financiamiento = value.financiamiento;
      let otros = value.otros;

      for (let i = 0; i < nrOfRecibos; i++) {
        let reciboInicio = polizaInicio
          .clone()
          .add((pastRecibos + i) * (12 / poliza.formaPago), "months");
        if (i === 0) {
          reciboInicio = endosoInicio;
        }
        const fechaLimite = moment(reciboInicio).add(
          i === 0
            ? poliza.aseguradora.plazoPrimer
            : poliza.aseguradora.plazoSubsecuentes,
          "days"
        );

        let fechaPago = value[`recibo${i + 1}`];

        if (fechaPago === "PAGADO" || fechaPago === "pagado") {
          fechaPago = moment().toDate();
        } else if (typeof fechaPago === "string") {
          fechaPago = moment(fechaPago.split("/").reverse().join("-")).toDate();
        } else {
          fechaPago = null;
        }

        let reciboPrimaNeta = primaNeta / nrOfRecibos;
        const expedicion = i === 0 ? value.expedicion : 0;
        let reciboFinanciamiento = financiamiento / nrOfRecibos;
        let reciboOtros = otros / nrOfRecibos;

        if (i === 0) {
          const reciboFin = polizaInicio
            .clone()
            .add((pastRecibos + 1) * (12 / poliza.formaPago), "months");

          const endosoDaysDiff = endosoFin.diff(reciboInicio, "days");
          const reciboDaysDiff = reciboFin.diff(reciboInicio, "days");

          reciboPrimaNeta = (reciboDaysDiff * primaNeta) / endosoDaysDiff;
          reciboFinanciamiento =
            (reciboDaysDiff * financiamiento) / endosoDaysDiff;
          reciboOtros = (reciboDaysDiff * otros) / endosoDaysDiff;

          primaNeta -= reciboPrimaNeta;
          financiamiento -= reciboFinanciamiento;
          otros -= reciboOtros;
        } else {
          reciboPrimaNeta = primaNeta / (nrOfRecibos - 1);
          reciboFinanciamiento = financiamiento / (nrOfRecibos - 1);
          reciboOtros = otros / (nrOfRecibos - 1);
        }

        const iva =
          (reciboPrimaNeta + expedicion + reciboFinanciamiento + reciboOtros) *
          0.16;
        const primaTotal =
          reciboPrimaNeta +
          expedicion +
          reciboFinanciamiento +
          iva +
          reciboOtros;

        const recibo = await Recibo.create(
          {
            exhibicion: i + 1,
            de: nrOfRecibos,
            primaNeta: reciboPrimaNeta,
            expedicion,
            financiamiento: reciboFinanciamiento,
            otros: reciboOtros,
            iva,
            primaTotal,
            fechaInicio: reciboInicio.toDate(),
            fechaLimite: fechaLimite.toDate(),
            fechaPago,
            polizaId: poliza.id,
            endosoId: endoso.id,
          },
          {
            transaction: t,
          }
        );
      }

      await t.commit();
      results.push(endoso);
    } catch (error) {
      await t.rollback();
      errors.push({ error: error.message, row });
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
