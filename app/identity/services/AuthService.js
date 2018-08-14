'use strict';

const _ = require('lodash');
const FactoryDBRepository = require('core/repositories/DBRepository');

const validPassMatch = require('identity/services/validator/validPassMatch');
const tokenTransform = require('identity/transforms/tokenTransform');

const factoryValid = require('core/libs/factoryValid');


const AuthService = (Entity) => {

    const DBRepository = FactoryDBRepository(Entity);

    return {
        authenticate (body) {

            return new Promise((resolve, reject) => {

                body = _.pick(body, 'email', 'password');
                factoryValid(body, Entity.validators.login);

                const {email} = body;
                const {password} = body;

                return DBRepository
                    .findOne({email})
                    .then((e) => {
                        return validPassMatch(password, e);
                    })
                    .then(e=>_.pick(e, '_id', 'name', 'email'))
                    .then(tokenTransform)
                    .then(resolve)
                    .catch(reject);
            });
        }
    };

};

module.exports = AuthService;
