const joi = require("joi");

const validator = (schema) => (payload) => schema.validate(payload);

const estadoIdSchema = joi.object({
  estado: joi.number().min(1).max(32).required(),
});

const productoSchema = joi.object({
  producto: joi.string().required(),
});

const productoIdSchema = joi.object({
  id: joi.number().required(),
});

module.exports.validateEstadoId = validator(estadoIdSchema);

module.exports.validateProducto = validator(productoSchema);

module.exports.validateProductoId = validator(productoIdSchema);
