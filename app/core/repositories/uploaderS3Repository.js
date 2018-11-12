'use strict';

const _ = require('lodash');
const aws = require('aws-sdk');
const fs = require("pn/fs");
const svg_to_png = require('svg-to-png');
const getPwdPath = require('core/libs/pwd');
const mkDirByPathSync = require('core/repositories/libs/mkdirRecursive');

const mapsFile = require('./maps/mapFileType');
const UploaderError = require('core/errors/factoryError')('UploaderError');

const factoryValid = require('core/libs/factoryValid');
const s3Valid = require('core/validators/s3_valid');


const UploaderRepository = () => {

    factoryValid(
        _.pick(process.env, ['AWS_S3_BUCKET_NAME', 'AWS_ACCESS_KEY_ID', 'AWS_SECRET_ACCESS_KEY']),
        s3Valid
    );

    return {

        upload(out, folder, filename, ext) {

            return new Promise((resolve, reject) => {
                const s3 = new aws.S3();
                const S3_BUCKET = process.env.AWS_S3_BUCKET_NAME;
                const PATH = S3_BUCKET + '/' + folder;

                s3.putObject({
                        Bucket: PATH,
                        Key: filename,
                        ContentType: mapsFile(ext),
                        Body: out
                    })
                    .promise()
                    .then(resolve)
                    .catch(reject);
            });
        },

        readfiles(folder, filename) {

            return new Promise((resolve, reject) => {
                const s3 = new aws.S3();
                const S3_BUCKET = process.env.AWS_S3_BUCKET_NAME;

                s3.getObject({
                        Bucket: S3_BUCKET,
                        Key: `${folder}/${filename}`
                    })
                    .promise()
                    .then((data) => {
                        let dt = data.Body;

                        if(data.ContentType.indexOf("image") === -1)
                            dt = dt.toString('utf-8');

                        resolve(dt);
                    })
                    .catch(reject);
            });
        },

        deleteFiles(folder, filename) {

            return new Promise((resolve, reject) => {
                const s3 = new aws.S3();
                const S3_BUCKET = process.env.AWS_S3_BUCKET_NAME;

                console.log(`${folder}/${filename}`)

                s3.deleteObject({
                    Bucket: S3_BUCKET,
                    Key: `${folder}/${filename}`
                })
                    .promise()
                    .then(resolve)
                    .catch(reject);

            });
        },

        convertSvgToPng(folder, filename, ext) {
            return new Promise((resolve, reject) => {
                const appRoot = getPwdPath();
                const tmp = process.env.MAESTRO_TMP || "tmp/";

                const svgFilename = `${filename}.svg`;
                const imgFilename = `${filename}.${ext}`;

                const fullS = `${appRoot}/${tmp}/${svgFilename}`;
                const fullP = `${appRoot}/${tmp}/${imgFilename}`;

                mkDirByPathSync(tmp);

                UploaderRepository()
                    .readfiles(folder, svgFilename)
                    .then(e => fs.writeFile(fullS, e))
                    .then(() => svg_to_png.convert(fullS, tmp))
                    .then(() => fs.readFile(fullP))
                    .then(buffer => {
                        UploaderRepository()
                            .upload(buffer, folder, imgFilename, ext)
                            .then(() => {
                                fs.unlink(fullS);
                                fs.unlink(fullP);
                            })
                            .catch(console.log);

                        resolve(buffer);
                    })
                    .catch(reject);
            });
        }
    };
};

module.exports = UploaderRepository;
