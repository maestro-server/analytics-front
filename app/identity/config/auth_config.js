'use strict';

const {ExtractJwt} = require('passport-jwt');

module.exports = (token='SECRETJWT') => {
    const secret = process.env[`MAESTRO_${token}`];

    return {
        jwtSecret: {
            secretOrKey: secret || 'defaultSecretKey',
            jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('jwt')
        },
        jwtSession: {
            session: false
        }
    };
};
