'use strict';

const Joi = require('joi');

const schema = Joi.object().keys({
    payload: Joi.any().required()
});

module.exports = {
    create: schema,
    update: schema,
    delete: {},
    list: {}
};
