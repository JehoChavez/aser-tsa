const joi = require("joi");

const validator = (schema) => (payload) => schema.validate(payload);

const estadoIdSchema = joi.object({
  estado: joi.number().positive().integer().min(1).max(32).required(),
});

const productoSchema = joi.object({
  producto: joi.string().required(),
});

const genericIdSchema = joi.object({
  id: joi.number().positive().integer().required(),
});

const idArraySchema = joi
  .array()
  .items(joi.number().positive().integer().min(1).required());

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

module.exports.validateEstadoId = validator(estadoIdSchema);

module.exports.validateProducto = validator(productoSchema);

module.exports.validateGenericId = validator(genericIdSchema);

module.exports.validateIdArray = validator(idArraySchema);

module.exports.validateAgent = validator(agenteSchema);

module.exports.validateAseguradora = validator(aseguradoraSchema);

module.exports.validateVendedor = validator(vendedorSchema);

module.exports.validateCliente = validator(clienteSchema);
