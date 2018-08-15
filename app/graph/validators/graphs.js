'use strict';

const Joi = require('joi');

const schema = Joi.object().keys({
    status: Joi.string().valid('process', 'finished', 'error', 'warning').default('process'),
    msg: Joi.any(),
    active: Joi.boolean()
});

module.exports = {
    create: schema,
    update: schema,
    delete: {},
    list: {}
};
