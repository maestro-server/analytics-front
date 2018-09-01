'use strict';

const _ = require('lodash');

const DPersistenceServices = require('core/services/PersistenceServices');
const DUploaderService = require('core/services/UploaderService');

const pngGraph = require('graph/services/readPngGraph.js');
const notExist = require('graph/applications/validator/validNotExist');


const ApplicationReport = (Entity, PersistenceServices = DPersistenceServices) => (FUploadService = DUploaderService) => {

    const UploadService = FUploadService;

    return {
        view(req, res) {
            const {id} = req.params;
            const ext = _.get(req.query, 'ext', 'html');

            PersistenceServices(Entity)
                .findOne(id, req.user)
                .then(notExist)
                .then(() => {
                    return UploadService(Entity, id, ext)
                            .readImage();
                })
                .then(e => res.send(e))
                .catch((e) => {
                    console.error(e);
                    res.render('404');
                });
        },

        png(req, res) {
            const {id} = req.params;
            res.type('png');

            PersistenceServices(Entity)
                .findOne(id, req.user)
                .then(notExist)
                .then(() => pngGraph(Entity, id)(UploadService))
                .then(e => res.send(e))
                .catch((e) => {
                    console.error(e);
                    res.render('404');
                });            
        }
    };
};

module.exports = _.curry(ApplicationReport);
