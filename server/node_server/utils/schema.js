const Joi = require("joi");

module.exports.schema = Joi.object({
    username : Joi.string().required(),
    password : Joi.string().min(8).max(12)
});

