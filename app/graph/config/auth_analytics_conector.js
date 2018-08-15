'use strict';

const _ = require('lodash');
const {Passport} = require('passport');

const {Strategy} = require('passport-jwt');
const config = require('./auth_config_analytics')();
const PermissionError = require('core/errors/factoryError')('PermissionError');

module.exports = function () {
    const passport = new Passport();

    const strategy = new Strategy(config.jwtSecret, function (payload, done) {

        const {token} = payload;

        if (token) {
            const noauth = process.env.MAESTRO_NOAUTH || "defaultSecretNoAuthToken"
            const ids = _.pick(payload, ['graph_id', 'owner_id']);

            if (noauth === token) {
                return done(null, ids);
            }
            return done(new PermissionError("Invalid token"), false);
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
