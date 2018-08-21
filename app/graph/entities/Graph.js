'use strict';

const _ = require('lodash');

const Graphs = require('../repositories/dao/graphs');

const graphs = () => {
    const resFilled = ['_id', 'updated_at', 'status'];

    const singleFilled = [...resFilled, 'name', 'systems', 'clients', 'apps'];

    const filled = [..._.slice(singleFilled, 2)]; // delete id

    return {
      name: "graphs",

      access: 'roles',

      validators: require('../validators/graphs'),

      dao: Graphs,

      filled,
      singleFilled,
      resFilled
    };
};

module.exports = graphs();
