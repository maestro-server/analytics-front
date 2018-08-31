'use strict';

const svgToPng = require('graph/services/svgToPng.js');

module.exports = (Entity, id) => (UploadService) => {

    return new Promise((resolve, reject) => {

        const Upload = UploadService(Entity, id, "png");

        Upload.readImage()
            .then(() => resolve(Upload.getFullPath()))
            .catch((e) => {
                if (e.code == 'ENOENT') {
                    svgToPng(Upload)
                    .then(resolve);
                } else {
                    reject(e);
                }
            });
    });
};