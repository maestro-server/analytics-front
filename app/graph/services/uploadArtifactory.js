'use strict';

const fs = require('fs');
const _ = require('lodash');
const DUploaderService = require('core/services/UploaderService');


module.exports = (Entity) => (out, _id, ext='html') => (FUploadService = DUploaderService) => {

    const UploadService = FUploadService;

    return new Promise((resolve, reject) => {

        UploadService(Entity, _id)
            .uploadImage(out, ext)
            .then(resolve)
            .catch(reject);
    });
};