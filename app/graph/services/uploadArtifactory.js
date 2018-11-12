'use strict';


const DUploaderService = require('core/services/UploaderService');


module.exports = (Entity) => (out, _id, ext='html') => (FUploadService = DUploaderService) => {

    const UploadService = FUploadService;

    return {
        upload() {
            return new Promise((resolve, reject) => {

                UploadService(Entity, _id)
                    .uploadImage(out, ext)
                    .then(resolve)
                    .catch(reject);
            });
        },

        del() {
            return new Promise((resolve, reject) => {

                UploadService(Entity, _id)
                    .deleteImage(ext)
                    .then(resolve)
                    .catch(reject);
            });
        }
    }
};