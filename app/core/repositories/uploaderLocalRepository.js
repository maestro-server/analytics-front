'use strict';

const _ = require('lodash');
const fs = require('fs');
const mapsFile = require('./maps/mapFileType');
const getPwdPath = require('core/libs/pwd');

const {CONTENT_UPLOAD_DEFAULT, LOCAL_DIR_DEFAULT} = require('core/configs/uploadRole');

const UploaderRepository = () => {

    return {
        upload(out, folder, filename) {
            return new Promise((resolve, reject) => {
                const appRoot = getPwdPath();
                const base = process.env.LOCAL_DIR || LOCAL_DIR_DEFAULT;

                const newPath = `${appRoot}${base}/${folder}`;
                const fullpath = `${newPath}/${filename}`;

                if (!fs.existsSync(newPath)){
                    fs.mkdirSync(newPath);
                }


                fs.writeFile(fullpath, out, (err) => {
                    if (err)
                        reject(err);

                    resolve({
                        filename,
                        fullpath
                    });
                });
            });
        }
    };
};

module.exports = UploaderRepository;
