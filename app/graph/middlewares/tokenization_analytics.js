'use strict';

const analyticsAuth = require('graph/config/auth_conector_analytics');

module.exports = function () {
    return analyticsAuth().initialize();
};
