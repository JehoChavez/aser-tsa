const joi = require("joi");

const validator = (schema) => (payload) => schema.validate(payload);

const estadoIdSchema = joi.object({
  estado: joi.number().min(1).max(32).required(),
});

module.exports.validateEstadoId = validator(estadoIdSchema);
