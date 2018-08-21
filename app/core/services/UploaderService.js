'use strict';

const _ = require('lodash');
const {TYPE_DEFAULT} = require('core/configs/uploadRole');
const FileFoundError = require('core/errors/factoryError')('FileFoundError');


const UploaderService = (Entity, owner, dfolder='graphs-bussiness') => {
    const typeU = process.env.MAESTRO_UPLOAD_TYPE || TYPE_DEFAULT;
    const FUploaderRepository = require(`core/repositories/uploader${typeU}Repository`);

    const UploaderRepository = FUploaderRepository(Entity.name);

    const folder = `${dfolder}/${owner}`;

    return {

        uploadImage(out, ext = 'html') {

            return new Promise((resolve, reject) => {
                const filename = `${owner}.${ext}`;

                return UploaderRepository
                    .upload(out, folder, filename)
                    .then(resolve)
                    .catch(reject);

            });
        },

        readImage(ext = 'html') {

            return new Promise((resolve, reject) => {
                const filename = `${owner}.${ext}`;

                return UploaderRepository
                    .readfiles(folder, filename)
                    .then(resolve)
                    .catch(reject);
            });
        }
    };
};

module.exports = _.curry(UploaderService);
