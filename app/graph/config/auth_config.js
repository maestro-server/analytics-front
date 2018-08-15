'use strict';

const {ExtractJwt} = require('passport-jwt');

module.exports = () => {
    const secret = process.env.MAESTRO_SECRETJWT;

    return {
        jwtSecret: {
            secretOrKey: secret || 'defaultSecretKey',
            jwtFromRequest: ExtractJwt.fromUrlQueryParameter('jwt')
        },
        jwtSession: {
            session: false
        }
    };
};
