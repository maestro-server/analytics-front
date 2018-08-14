'use strict';

const _ = require('lodash');

const Users = require('../repositories/dao/users');

const users = () => {
    const resFilled = ['_id', 'name', 'email'];

    const singleFilled = [...resFilled];

    const filled = [..._.tail(singleFilled), 'password']; // delete id

    return {
      name: "users",

      access: null,

      validators: require('../validators/users'),

      dao: Users,

      filled,
      singleFilled,
      resFilled
    };
};

module.exports = users();
