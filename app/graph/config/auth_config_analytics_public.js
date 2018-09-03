'use strict';

const {ExtractJwt} = require('passport-jwt');

module.exports = () => {
    const secret = process.env.MAESTRO_SECRETJWT_PUBLIC_ANALYTICS;

    return {
        jwtSecret: {
            secretOrKey: secret || 'defaultSecretKey',
            jwtFromRequest: ExtractJwt.fromUrlQueryParameter('token')
        },
        jwtSession: {
            session: false
        }
    };
};
