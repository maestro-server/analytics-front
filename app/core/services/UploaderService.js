'use strict';

const _ = require('lodash');
const formidable = require('formidable');
const validateFile = require('./validator/uploadValid');
const {TYPE_DEFAULT} = require('core/configs/uploadRole');
const getPwdPath = require('core/libs/pwd');

const UploaderService = (Entity) => {
  const typeU = process.env.MAESTRO_UPLOAD_TYPE || TYPE_DEFAULT;
  const FUploaderRepository = require(`core/repositories/uploader${typeU}Repository`);

  const UploaderRepository = FUploaderRepository(Entity.name);

    return {

        uploadImage(out, owner, folder='graphs-bussiness', ext='html') {
            
            return new Promise((resolve, reject) => {
                const filename = `${owner}.${ext}`;

                return UploaderRepository
                    .upload(out, folder, filename)
                    .then(resolve)
                    .catch(reject);

            });
        }
    };
};

module.exports = _.curry(UploaderService);
