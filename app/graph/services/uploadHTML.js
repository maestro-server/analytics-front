'use strict';

const fs = require('fs');
const _ = require('lodash');
const DUploaderService = require('core/services/UploaderService');


module.exports = (Entity) => (out, owners, host, filetype="text/html") => (FUploadService = DUploaderService) => {

    const UploadService = FUploadService(Entity);

    return new Promise((resolve, reject) => {
        const req = {
            query: {filetype},
            headers: {host}
        };

        const owner = {_id: owners['graph_id']};
        console.log(host);

        const query = {
            'ext': 'html',
            'folder': 'graphs'
        }

        
        let buffer = new Buffer(out);

        UploadService
            .signed(req, owner)
            .then((e) => {
                const nreq = {
                    query,
                    files
                }
                return UploadService
                    .uploadImage(nreq, owner)
            })
            .then(console.log)
            .then(resolve)
            .catch(reject);
    });
};