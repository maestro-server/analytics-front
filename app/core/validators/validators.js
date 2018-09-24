'use strict';

const Joi = require('joi');

module.exports = {
    roles: Joi.object().keys({
        _id: Joi.object(),
        role: Joi.number().valid(1, 3, 7).required(),
        refs: Joi.string().valid("users", "teams", "projects", "organization").required(),
        name: Joi.string().max(100),
        email: Joi.string().email().max(250)
    }),
    owner: Joi.object({
        name: Joi.string().max(100),
        email: Joi.string().email(),
        _id: Joi.object(),
        refs: Joi.string()
    })
};
