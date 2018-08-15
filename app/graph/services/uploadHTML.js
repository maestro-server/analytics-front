'use strict';

const fs = require('fs');
const _ = require('lodash');
const DUploaderService = require('core/services/UploaderService');


module.exports = (Entity) => (out, owners) => (FUploadService = DUploaderService) => {

    const UploadService = FUploadService;

    return new Promise((resolve, reject) => {

        UploadService(Entity)
            .uploadImage(out, owners['graph_id'])
            .then(resolve)
            .catch(reject);
    });
};