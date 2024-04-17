const joi = require("joi");

const validator = (schema) => (payload) => schema.validate(payload);

const estadoIdSchema = joi.object({
  estado: joi.number().min(1).max(32).required(),
});

const productoSchema = joi.object({
  producto: joi.string().required(),
});

const genericIdSchema = joi.object({
  id: joi.number().required(),
});

const idArraySchema = joi
  .array()
  .items(joi.number().positive().integer().min(1).required());

module.exports.validateEstadoId = validator(estadoIdSchema);

module.exports.validateProducto = validator(productoSchema);

module.exports.validateGenericId = validator(genericIdSchema);

module.exports.validateIdArray = validator(idArraySchema);
