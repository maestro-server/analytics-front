'use strict';

const _ = require('lodash');

const DFactoryDBRepository = require('core/repositories/DBRepository');

const Access = require('core/entities/accessRole');
const accessMergeTransform = require('./transforms/accessMergeTransform');


const Persistence = (Entity, FactoryDBRepository = DFactoryDBRepository) => {

    const DBRepository = FactoryDBRepository(Entity);

    return {
        public(filter) {
            return new Promise((resolve, reject) => {
                
                return DBRepository
                    .findOne(filter)
                    .then(resolve)
                    .catch(reject);
            });
        },


        findOne (_id, owner, access = Access.ROLE_READ) {

            return new Promise((resolve, reject) => {

                const prepared = accessMergeTransform(owner, Entity.access, {_id}, access);

                return DBRepository
                    .findOne(prepared)
                    .then(resolve)
                    .catch(reject);
            });
        },

        patch (_id, post, owner, access = Access.ROLE_WRITER) {

            return new Promise((resolve, reject) => {

                const fill = _.difference(Entity.filled, ['owner', Entity.access, 'password', '_id']);

                const prepared = accessMergeTransform(owner, Entity.access, {_id}, access);

                return DBRepository
                    .patch(prepared, post, fill)
                    .then(resolve)
                    .catch(reject);
            });
        }

    };
};

module.exports = _.curry(Persistence);
