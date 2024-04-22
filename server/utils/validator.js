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

module.exports.validateEstadoId = validator(estadoIdSchema);

module.exports.validateProducto = validator(productoSchema);

module.exports.validateGenericId = validator(genericIdSchema);

module.exports.validateIdArray = validator(idArraySchema);

module.exports.validateAgent = validator(agenteSchema);

module.exports.validateAseguradora = validator(aseguradoraSchema);

module.exports.validateVendedor = validator(vendedorSchema);
