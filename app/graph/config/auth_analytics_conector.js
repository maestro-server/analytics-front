'use strict';

const _ = require('lodash');
const passport = require('passport');
const {Strategy} = require('passport-jwt');

const DecodeAnalyticJWT = require('graph/services/DecodeAnalyticJWT');

const config = require('identity/config/auth_config')('ANALYTICS_SECRETJWT');
const PermissionError = require('core/errors/factoryError')('PermissionError');

module.exports = function() {
  const strategy = new Strategy(config.jwtSecret, function (payload, done) {
        
        const {token} = payload;
        
        if(token) {
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
