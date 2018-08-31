'use strict';

const _ = require('lodash');
const fs = require('fs');
const getPwdPath = require('core/libs/pwd');
const mkDirByPathSync = require('./libs/mkdirRecursive');

const {LOCAL_DIR_DEFAULT} = require('core/configs/uploadRole');


const UploaderRepository = () => {

    const appRoot = getPwdPath();
    const base = process.env.LOCAL_DIR || LOCAL_DIR_DEFAULT;

    const newPath = `${appRoot}${base}`;

    mkDirByPathSync(newPath);

    return {
        getPath(folder, filename) {
            const relPath = `${newPath}/${folder}`;
            const fullpath = `${relPath}/${filename}`;
            return fullpath;
        },

        getFolder(folder) {
            return `${newPath}/${folder}`;
        },

        upload(out, folder, filename) {
            return new Promise((resolve, reject) => {
                const relPath = `${newPath}/${folder}`;
                const fullpath = `${relPath}/${filename}`;


                if (!fs.existsSync(relPath)){
                    fs.mkdirSync(relPath);
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
        },

        readfiles(folder, filename) {

            return new Promise((resolve, reject) => {
                const relPath = `${newPath}/${folder}`;
                const fullpath = `${relPath}/${filename}`;

                fs.readFile(fullpath, 'utf8', function(err, contents) {
                    if (err)
                        reject(err);

                    resolve(contents);
                });
            });
        }
    };
};

module.exports = UploaderRepository;
