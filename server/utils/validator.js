const joi = require("joi");
const ExpressError = require("./ExpressError");

const idValidator = (schema) => (req, res, next) => {
  const { error, value } = schema.validate(req.params);

  if (error) throw new ExpressError(error.details[0].message, 400);

  next();
};

const bodyValidator = (schema) => (req, res, next) => {
  const { error, value } = schema.validate(req.body);

  if (error) throw new ExpressError(error.details[0].message, 400);

  next();
};

const queryValidator = (schema) => (req, res, next) => {
  const { error, value } = schema.validate(req.query);

  if (error) throw new ExpressError(error.details[0].message, 400);

  next();
};

const estadoIdSchema = joi.object({
  estado: joi.number().positive().integer().min(1).max(32).required(),
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
  nacimiento: joi.string().isoDate(),
  rfc: joi.string(),
  calle: joi.string(),
  exterior: joi.string(),
  interior: joi.string(),
  colonia: joi.string(),
  codigoPostal: joi.number().integer().positive(),
  correo: joi.string().email(),
  telefono: joi.string(),
  empresa: joi.string(),
  comentarios: joi.string(),
  estadoId: joi.number().positive().integer().max(32),
  municipioId: joi.number().positive().integer(),
});

const reciboSchema = joi.object({
  exhibicion: joi.number().integer().required(),
  de: joi.number().integer().required(),
  monto: joi.number().required(),
  fechaInicio: joi.string().isoDate().required(),
  fechaLimite: joi.string().isoDate().required(),
  fechaPago: joi.string().isoDate(),
  polizaId: joi.number().positive(),
  endosoId: joi.number().positive(),
});

const polizaSchema = joi.object({
  poliza: joi.object({
    noPoliza: joi.string().required(),
    emision: joi.string().isoDate(),
    inicioVigencia: joi.string().isoDate().required(),
    finVigencia: joi.string().isoDate().required(),
    bienAsegurado: joi.string().required(),
    primaNeta: joi.number().required(),
    expedicion: joi.number(),
    financiamiento: joi.number(),
    iva: joi.number(),
    primaTotal: joi.number().required(),
    moneda: joi.string().valid("MXN", "USD", "UDI"),
    formaPago: joi.number().valid(1, 2, 4, 12),
    comentarios: joi.string(),
    fechaCancelacion: joi.string().isoDate(),
    clienteId: joi.number().positive().integer().required(),
    aseguradoraId: joi.number().positive().integer().required(),
    agenteId: joi.number().integer().positive().required(),
    vendedorId: joi.number().integer().positive().required(),
    ramoId: joi.number().integer().positive().required(),
    renovacionId: joi.number().integer().positive(),
    reexpedicioId: joi.number().integer().positive(),
  }),
  recibos: joi.array().items(reciboSchema).required(),
});

const queryPolizasSchema = joi.object({
  noPoliza: joi.string(),
  page: joi.number(),
  limit: joi.number(),
});

module.exports.validateEstadoId = idValidator(estadoIdSchema);

module.exports.validateRamo = bodyValidator(ramoSchema);

module.exports.validateGenericId = idValidator(genericIdSchema);

module.exports.validateIdArray = bodyValidator(idArraySchema);

module.exports.validateAgent = bodyValidator(agenteSchema);

module.exports.validateAseguradora = bodyValidator(aseguradoraSchema);

module.exports.validateVendedor = bodyValidator(vendedorSchema);

module.exports.validateCliente = bodyValidator(clienteSchema);

module.exports.validatePoliza = bodyValidator(polizaSchema);

module.exports.validateQueryPolizas = queryValidator(queryPolizasSchema);