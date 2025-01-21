const joi = require("joi");
const ExpressError = require("./ExpressError");

const idValidator = (schema) => (req, res, next) => {
  try {
    const { error, value } = schema.validate(req.params);

    if (error) throw new ExpressError(error.details[0].message, 400);

    next();
  } catch (error) {
    next(error);
  }
};

const bodyValidator = (schema) => (req, res, next) => {
  try {
    const { error, value } = schema.validate(req.body);

    if (error) throw new ExpressError(error.details[0].message, 400);

    next();
  } catch (error) {
    next(error);
  }
};

const queryValidator = (schema) => (req, res, next) => {
  try {
    const { error, value } = schema.validate(req.query);

    if (error) throw new ExpressError(error.details[0].message, 400);

    next();
  } catch (error) {
    next(error);
  }
};

const estadoIdSchema = joi.object({
  estado: joi.number().positive().integer().min(1).max(32).required(),
});

const estadoMunicipioIdSchema = joi.object({
  id: joi.number().positive().integer().min(1).max(32).required(),
  municipioId: joi.number().positive().integer(),
});

const ramoSchema = joi.object({
  ramo: joi.string().required(),
});

const genericIdSchema = joi.object({
  id: joi.number().positive().integer().required(),
});

const idArraySchema = joi.object({
  aseguradoraIds: joi
    .array()
    .items(joi.number().positive().integer().min(1).required()),
});

const agenteSchema = joi.object({
  clave: joi.number().positive().integer().min(1).required(),
  nombre: joi.string().required(),
  comentarios: joi.string(),
  aseguradoraId: joi.number().positive().integer().min(1).required(),
});

const aseguradoraSchema = joi.object({
  aseguradora: joi.string().required(),
  plazoPrimer: joi.number().integer().min(0),
  plazoSubsecuentes: joi.number().integer().min(0),
  comentarios: joi.string(),
});

const vendedorSchema = joi.object({
  nombre: joi.string().required(),
  comentarios: joi.string(),
});

const clienteSchema = joi.object({
  tipoPersona: joi.string().valid("fisica", "moral"),
  nombre: joi.string().required(),
  nacimiento: joi.alternatives().try(joi.string().isoDate(), joi.date()),
  rfc: joi.string().allow(""),
  calle: joi.string().allow(""),
  exterior: joi.string().allow(""),
  interior: joi.string().allow(""),
  colonia: joi.string().allow(""),
  codigoPostal: joi.number().integer().positive().allow("", null),
  correo: joi.string().email().allow(""),
  telefono: joi.string().allow(""),
  empresa: joi.string().allow(""),
  comentarios: joi.string().allow(""),
  estadoId: joi.number().integer().min(0).max(32),
  municipioId: joi.number().integer().min(0),
});

const reciboSchema = joi.object({
  exhibicion: joi.number().integer().required(),
  de: joi.number().integer().required(),
  primaNeta: joi.number().required(),
  expedicion: joi.number(),
  financiamiento: joi.number(),
  iva: joi.number(),
  otros: joi.number(),
  primaTotal: joi.number().required(),
  fechaInicio: joi
    .alternatives()
    .try(joi.string().isoDate(), joi.date())
    .required(),
  fechaLimite: joi
    .alternatives()
    .try(joi.string().isoDate(), joi.date())
    .required(),
  fechaPago: joi.alternatives().try(joi.string().isoDate(), joi.date()),
  polizaId: joi.number().positive(),
  endosoId: joi.number().positive(),
});

const polizaSchema = joi.object({
  poliza: joi
    .object({
      noPoliza: joi.string().required(),
      emision: joi.alternatives().try(joi.string().isoDate(), joi.date()),
      inicioVigencia: joi
        .alternatives()
        .try(joi.string().isoDate(), joi.date())
        .required(),
      finVigencia: joi
        .alternatives()
        .try(joi.string().isoDate(), joi.date())
        .required(),
      bienAsegurado: joi.string().required(),
      primaNeta: joi.number().required(),
      expedicion: joi.number(),
      financiamiento: joi.number(),
      otros: joi.number(),
      iva: joi.number(),
      primaTotal: joi.number().required(),
      moneda: joi.string().valid("MXN", "USD", "UDI"),
      formaPago: joi.number().valid(1, 2, 4, 12),
      comentarios: joi.string(),
      fechaCancelacion: joi
        .alternatives()
        .try(joi.string().isoDate(), joi.date()),
      clienteId: joi.number().positive().integer().required(),
      aseguradoraId: joi.number().positive().integer().required(),
      agenteId: joi.number().integer().positive().required(),
      vendedorId: joi.number().integer().positive().required(),
      ramoId: joi.number().integer().positive().required(),
      renovacionId: joi.number().integer().positive(),
      reexpedicioId: joi.number().integer().positive(),
    })
    .required(),
  recibos: joi.array().items(reciboSchema).required(),
});

const polizasQuerySchema = joi.object({
  noPoliza: joi.string(),
  page: joi.number(),
  limit: joi.number(),
  tipoFecha: joi
    .string()
    .valid(
      "inicioVigencia",
      "finVigencia",
      "emision",
      "createdAt",
      "fechaCancelacion"
    ),
  desde: joi.alternatives().try(joi.string().isoDate(), joi.date()),
  hasta: joi.alternatives().try(joi.string().isoDate(), joi.date()),
  cliente: joi.array().items(joi.number().integer().positive()),
  aseguradora: joi.array().items(joi.number().integer().positive()),
  agente: joi.array().items(joi.number().integer().positive()),
  vendedor: joi.array().items(joi.number().integer().positive()),
  ramo: joi.array().items(joi.number().integer().positive()),
  orden: joi.string().valid("ASC", "DESC"),
  por: joi
    .string()
    .valid(
      "inicioVigencia",
      "finVigencia",
      "emision",
      "createdAt",
      "fechaCancelacion"
    ),
  estado: joi
    .array()
    .items(
      joi
        .string()
        .valid("vigentes", "renovadas", "reexpedidas", "canceladas", "vencidas")
    ),
});

const endosoSchema = joi.object({
  endoso: joi
    .object({
      endoso: joi.string().required(),
      emision: joi.alternatives().try(joi.string().isoDate(), joi.date()),
      inicioVigencia: joi
        .alternatives()
        .try(joi.string().isoDate(), joi.date())
        .required(),
      finVigencia: joi
        .alternatives()
        .try(joi.string().isoDate(), joi.date())
        .required(),
      tipo: joi.string().valid("A", "B", "D"),
      primaNeta: joi.number(),
      expedicion: joi.number(),
      financiamiento: joi.number(),
      otros: joi.number(),
      iva: joi.number(),
      primaTotal: joi.number(),
      concepto: joi.string(),
      fechaCancelacion: joi
        .alternatives()
        .try(joi.string().isoDate(), joi.date()),
      polizaId: joi.number().integer().positive().required(),
    })
    .required(),
  recibos: joi.array().items(reciboSchema),
});

const recibosQuerySchema = joi.object({
  desde: joi.alternatives().try(joi.string().isoDate(), joi.date()),
  hasta: joi.alternatives().try(joi.string().isoDate(), joi.date()),
  pendientes: joi.bool(),
});

const cancelacionSchema = joi.object({
  fechaCancelacion: joi
    .alternatives()
    .try(joi.string().isoDate(), joi.date())
    .required(),
});

const pagoSchema = joi.object({
  fechaPago: joi
    .alternatives()
    .try(joi.string().isoDate(), joi.date())
    .required(),
});

const clienteIdSchema = joi.object({
  clienteId: joi.number().positive().integer().required(),
});

const clienteQuerySchema = joi.object({
  nombre: joi.string(),
  tipoPersona: joi.string().valid("fisica", "moral"),
  estadoId: joi.number().integer().positive().min(1).max(32),
  page: joi.number(),
  limit: joi.number(),
  orden: joi.string().valid("ASC", "DESC"),
  por: joi.string().valid("createdAt", "nombre"),
});

const loginSchema = joi.object({
  password: joi.string().required(),
});

const pendientesQuerySchema = joi.object({
  desde: joi.alternatives().try(joi.string().isoDate(), joi.date()).required(),
  hasta: joi.alternatives().try(joi.string().isoDate(), joi.date()).required(),
});

module.exports.validateEstadoId = queryValidator(estadoIdSchema);

module.exports.validateRamo = bodyValidator(ramoSchema);

module.exports.validateGenericId = idValidator(genericIdSchema);

module.exports.validateIdArray = bodyValidator(idArraySchema);

module.exports.validateAgent = bodyValidator(agenteSchema);

module.exports.validateAseguradora = bodyValidator(aseguradoraSchema);

module.exports.validateVendedor = bodyValidator(vendedorSchema);

module.exports.validateCliente = bodyValidator(clienteSchema);

module.exports.validatePoliza = bodyValidator(polizaSchema);

module.exports.validatePolizasQuery = queryValidator(polizasQuerySchema);

module.exports.validateEstadoMunicipioId = idValidator(estadoMunicipioIdSchema);

module.exports.validateEndoso = bodyValidator(endosoSchema);

module.exports.validateRecibosQuery = queryValidator(recibosQuerySchema);

module.exports.validateClienteId = bodyValidator(clienteIdSchema);

module.exports.validateCancelacion = bodyValidator(cancelacionSchema);

module.exports.validatePago = bodyValidator(pagoSchema);

module.exports.validateClienteQuery = queryValidator(clienteQuerySchema);

module.exports.validateLogin = bodyValidator(loginSchema);

module.exports.validatePendientesQuery = queryValidator(pendientesQuerySchema);
