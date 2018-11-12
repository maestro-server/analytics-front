'use strict';

const _ = require('lodash');
const {TYPE_DEFAULT} = require('core/configs/uploadRole');


const UploaderService = (Entity, owner, ext = 'html', dfolder='graphs-bussiness') => {
    const typeU = process.env.MAESTRO_UPLOAD_TYPE || TYPE_DEFAULT;
    const FUploaderRepository = require(`core/repositories/uploader${typeU}Repository`);

    const UploaderRepository = FUploaderRepository(Entity.name);

    const folder = `${dfolder}/${owner}`;

    return {

        uploadImage(out, fext = ext) {

            return new Promise((resolve, reject) => {
                const filename = `${owner}.${fext}`;

                return UploaderRepository
                    .upload(out, folder, filename, fext)
                    .then(resolve)
                    .catch(reject);

            });
        },

        readImage(fext = ext) {

            return new Promise((resolve, reject) => {
                const filename = `${owner}.${fext}`;

                return UploaderRepository
                    .readfiles(folder, filename)
                    .then(resolve)
                    .catch(reject);
            });
        },

        deleteImage(fext = ext) {

            return new Promise((resolve, reject) => {
                const filename = `${owner}.${fext}`;

                return UploaderRepository
                    .deleteFiles(folder, filename)
                    .then(resolve)
                    .catch(reject);
            });
        },

        convertSvgToPng(fext = ext) {

            return new Promise((resolve, reject) => {

                return UploaderRepository
                    .convertSvgToPng(folder, owner, fext)
                    .then(resolve)
                    .catch(reject);
            });
        }
    };
};

module.exports = _.curry(UploaderService);
