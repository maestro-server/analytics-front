'use strict';

const analyticsAuth = require('graph/config/auth_conector_public');

module.exports = function () {
    return analyticsAuth().authenticate();
};
