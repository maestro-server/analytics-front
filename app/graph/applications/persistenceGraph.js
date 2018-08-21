'use strict';

const _ = require('lodash');

const DPersistenceServices = require('core/services/PersistenceServices');
const UploadArtifactory = require('graph/services/uploadArtifactory');


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

                    const {graph_id, payload, owner_id} = data;
                    const owner = {'_id': owner_id};
                    
                    Promise.all([
                        UploadArtifactory(Entity)(out, graph_id)(),
                        UploadArtifactory(Entity)(payload, graph_id, 'svg')()
                        ])
                        .then(() => {
                            const post = {'status': 'finished', 'msg': 'Finish'};

                            return PersistenceServices(Entity)
                                    .patch(graph_id, post, owner);
                        })
                        .then(e => res.json(e))
                        .catch(next);
                });
            }
        }
    };
};

module.exports = _.curry(ApplicationAnalytics);
