'use strict';

const middleAuth = require('graph/config/auth_conector');

module.exports = function () {
    return middleAuth().initialize();
};
