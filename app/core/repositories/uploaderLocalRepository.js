'use strict';

const _ = require('lodash');
const fs = require("pn/fs");
const svg_to_png = require('svg-to-png');
const getPwdPath = require('core/libs/pwd');
const mkDirByPathSync = require('./libs/mkdirRecursive');

const {LOCAL_DIR_DEFAULT} = require('core/configs/uploadRole');


const UploaderRepository = () => {

    const appRoot = getPwdPath();
    const base = process.env.LOCAL_DIR || LOCAL_DIR_DEFAULT;

    const newPath = `${appRoot}${base}`;

    mkDirByPathSync(newPath);

    return {
        upload(out, folder, filename, ext) {
            return new Promise((resolve, reject) => {
                const relPath = `${newPath}/${folder}`;
                const fullpath = `${relPath}/${filename}`;

                if (!fs.existsSync(relPath)){
                    fs.mkdirSync(relPath);
                }

                fs.writeFile(fullpath, out)
                    .then(() => {
                        resolve({
                            filename,
                            fullpath
                        });
                    })
                    .catch(reject);

            });
        },

        readfiles(folder, filename) {

            return new Promise((resolve, reject) => {
                const relPath = `${newPath}/${folder}`;
                const fullpath = `${relPath}/${filename}`;

                fs.readFile(fullpath)
                    .then(resolve)
                    .catch(reject);

            });
        },

        deleteFiles(folder, filename) {

            return new Promise((resolve, reject) => {
                const relPath = `${newPath}/${folder}`;
                const fullpath = `${relPath}/${filename}`;

                fs.unlink(fullpath)
                    .then(resolve)
                    .catch(reject);
            });
        },

        convertSvgToPng(folder, filename, ext) {

            return new Promise((resolve, reject) => {

                const nPath = `${newPath}/${folder}/`;
                const fullS = `${nPath}${filename}.svg`;
                const fullP = `${nPath}${filename}.${ext}`;

                svg_to_png
                    .convert(fullS, nPath)
                    .then(() => fs.readFile(fullP))
                    .then(resolve)
                    .catch(reject);
            });
        }
    };
};

module.exports = UploaderRepository;
