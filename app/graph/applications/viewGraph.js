'use strict';

const _ = require('lodash');

const DPersistenceServices = require('core/services/PersistenceServices');
const DUploaderService = require('core/services/UploaderService');

const notExist = require('graph/applications/validator/validNotExist');


const ApplicationReport = (Entity, PersistenceServices = DPersistenceServices) => (FUploadService = DUploaderService) => {

    const UploadService = FUploadService;

    return {
        view(req, res, next) {
            const {id} = req.params;

            PersistenceServices(Entity)
                .findOne(id, req.user)
                .then(notExist)
                .then(() => {
                    return UploadService(Entity, id)
                            .readImage();
                })
                .then(e => res.send(e))
                .catch((e) => {
                    console.error(e);
                    res.render('404');
                });
        }
    };
};

module.exports = _.curry(ApplicationReport);
