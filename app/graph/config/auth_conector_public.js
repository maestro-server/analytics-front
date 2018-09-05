'use strict';

const _ = require('lodash');
const {Passport} = require('passport');

const {Strategy} = require('passport-jwt');

const config = require('graph/config/auth_config_analytics_public')();
const PermissionError = require('core/errors/factoryError')('PermissionError');

module.exports = function () {
    const passport = new Passport();

    const strategy = new Strategy(config.jwtSecret, function (payload, done) {
        if (payload) {
            done(null, payload);
        } else {
            done(new PermissionError("Graph not found"), false);
        }
    });

    passport.use(strategy);

    return {
        initialize: () => {
            return passport.initialize();
        },
        authenticate: () => {
            return passport.authenticate("jwt", config.jwtSession);
        }
    };
};
