'use strict';

const _ = require('lodash');

const DPersistenceServices = require('core/services/PersistenceServices');
const UploadArtifactory = require('graph/services/uploadArtifactory');


const ApplicationAnalytics = (Entity, PersistenceServices = DPersistenceServices) => {


    return {
        create(req, res, next) {
            const port = process.env.MAESTRO_PORT;
            const hostname = `${req.protocol}://${req.hostname}:${port}`;
            const api_url = process.env.API_URL || 'http://localhost:8888';

            const data = Object.assign({}, req.body, req.user, {hostname}, {api_url});
            
            if (_.has(data, 'graph_id') && _.has(data, 'owner_id')) {
                res.render('index', data, (err, out) => {
                    if (err)
                        next(err);

                    const {graph_id, payload, owner_id} = data;
                    const owner = {'_id': owner_id};

                    UploadArtifactory(Entity)('', graph_id, 'png')()
                        .del()
                        .catch((e)=>console.info(_.get(e, 'message')));
                    
                    Promise.all([
                        UploadArtifactory(Entity)(out, graph_id)().upload(),
                        UploadArtifactory(Entity)(payload, graph_id, 'svg')().upload()
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
