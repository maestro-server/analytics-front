'use strict';

const _ = require('lodash');

const DPersistenceServices = require('core/services/PersistenceServices');
const UploadHTML = require('graph/services/uploadHTML');


const ApplicationAnalytics = (Entity, PersistenceServices = DPersistenceServices) => {


    return {
        create(req, res, next) {
            const port = process.env.MAESTRO_PORT;
            const hostname = `${req.protocol}://${req.hostname}:${port}`;

            const data = Object.assign({}, req.body, req.user, {hostname});
            
            if (_.has(data, 'graph_id') && _.has(data, 'owner_id')) {
                res.render('index', data, (err, out) => {
                    if (err)
                        next(err);

                    const post = {'status': 'finished', 'msg': 'Finish'};
                    const owner = {'_id': _.get(data, 'owner_id')};
                    const _id = _.get(data, 'graph_id')

                    UploadHTML(Entity)(out, req.user)()
                        .then(() => {
                             return PersistenceServices(Entity)
                                .patch(_id, post, owner);
                        })
                        .then(e => res.json(e))
                        .catch(next);
                });
            }
        }
    };
};

module.exports = _.curry(ApplicationAnalytics);
