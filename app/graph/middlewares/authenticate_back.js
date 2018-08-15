'use strict';

const analyticsAuth = require('graph/config/auth_analytics_conector');

module.exports = function () {
    return analyticsAuth().authenticate();
};
