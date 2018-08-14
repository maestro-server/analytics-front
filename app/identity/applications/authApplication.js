'use strict';

const AuthService = require('identity/services/AuthService');

const AuthApp = (Entity) => {

    return {
        login (req, res, next) {

            AuthService(Entity)
                .authenticate(req.body)
                .then(e => res.json(e))
                .catch(function (e) {
                    next(e);
                });

        }
    };
};

module.exports = AuthApp;
