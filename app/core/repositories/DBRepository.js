'use strict';

const _ = require('lodash');
const findFilledFormat = require('./transforms/findFilledFormat');
const activeTransform = require('./transforms/activeFormat');
const validAccessUpdater = require('./validator/validAccessUpdater');
const factoryValid = require('core/libs/factoryValid');

const DBRepository = (Entity, options = {}) => {

    const DB = Entity.dao;

    return {

        findOne(filters, resFilled = Entity.singleFilled) {
            return new Promise((resolve, reject) => {
                const entityVS = _.get(Entity, 'visibility.single');
                const filter = Object.assign({}, filters, activeTransform.active(entityVS));

                return DB
                    .findOne(filter)
                    .then((e) => {
                        if (e)
                            e = e.get();

                        return _.pick(e, resFilled);
                    })
                    .then(resolve)
                    .catch(reject);

            });
        },

        patch(filter, post, fill = Entity.filled, resFilled = Entity.singleFilled) {
            return new Promise((resolve, reject) => {
                let data = findFilledFormat(post, fill);

                if(!_.has(options, 'ignoreValid'))
                  data = factoryValid(data, Entity.validators.update);

                return new DB(data)
                    .updateAndModify(filter, options)
                    .then(validAccessUpdater)
                    .then((e) => _.pick(e.get(), resFilled))
                    .then(resolve)
                    .catch(reject);

            });
        }

    };
};

module.exports = DBRepository;
