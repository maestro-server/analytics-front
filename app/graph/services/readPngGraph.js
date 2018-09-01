'use strict';


module.exports = (Entity, id) => (UploadService) => {

    return new Promise((resolve, reject) => {

        const Upload = UploadService(Entity, id, "png");

        Upload.readImage()
            .then(resolve)
            .catch((e) => {
                if (e.code == 'ENOENT' || e.code == 'AccessDenied') {
                    Upload
                        .convertSvgToPng('png')
                        .then(resolve)
                        .catch(reject);
                } else {
                    reject(e);
                }
            });
    });
};