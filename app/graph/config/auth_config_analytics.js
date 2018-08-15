'use strict';

const {ExtractJwt} = require('passport-jwt');

module.exports = () => {
    const secret = process.env.MAESTRO_ANALYTICS_SECRETJWT;

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
