'use strict';

const _ = require('lodash');
const {TYPE_DEFAULT} = require('core/configs/uploadRole');
const FileFoundError = require('core/errors/factoryError')('FileFoundError');


const UploaderService = (Entity, owner, ext = 'html', dfolder='graphs-bussiness') => {
    const typeU = process.env.MAESTRO_UPLOAD_TYPE || TYPE_DEFAULT;
    const FUploaderRepository = require(`core/repositories/uploader${typeU}Repository`);

    const UploaderRepository = FUploaderRepository(Entity.name);

    const folder = `${dfolder}/${owner}`;
    const filename = `${owner}.${ext}`;

    return {

        getFullPath(fext = ext) {
            const tmp = `${owner}.${fext}`;
            return UploaderRepository.getPath(folder, tmp);
        },

        getFolder() {
            return UploaderRepository.getFolder(folder);
        },

        uploadImage(out) {

            return new Promise((resolve, reject) => {

                return UploaderRepository
                    .upload(out, folder, filename)
                    .then(resolve)
                    .catch(reject);

            });
        },

        readImage() {

            return new Promise((resolve, reject) => {

                return UploaderRepository
                    .readfiles(folder, filename)
                    .then(resolve)
                    .catch(reject);
            });
        }
    };
};

module.exports = _.curry(UploaderService);
