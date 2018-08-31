'use strict';

const _ = require('lodash');
const aws = require('aws-sdk');
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
        getPath(folder, filename) {
            const S3_BUCKET = process.env.AWS_S3_BUCKET_NAME;
            const PATH = `${S3_BUCKET}/${folder}/${filename}`;
            return PATH;
        },

        getFolder(folder) {
            const S3_BUCKET = process.env.AWS_S3_BUCKET_NAME;
            const PATH = `${S3_BUCKET}/${folder}`;
            return PATH;
        },

        upload(out, folder, filename, filetype="text/html") {

            return new Promise((resolve, reject) => {
                const s3 = new aws.S3();
                const S3_BUCKET = process.env.AWS_S3_BUCKET_NAME;
                const PATH = S3_BUCKET + '/' + folder;


                const prm = s3.putObject({
                    Bucket: PATH,
                    Key: filename,
                    ContentType: filetype,
                    Body: out
                }).promise();

                prm
                    .then(resolve)
                    .catch(reject);
            });
        },

        readfiles(folder, filename, filetype="text/html") {

            return new Promise((resolve, reject) => {
                const s3 = new aws.S3();
                const S3_BUCKET = process.env.AWS_S3_BUCKET_NAME;
                const PATH = `${S3_BUCKET}/${folder}`;

                const prm = s3.getObject({
                    Bucket: S3_BUCKET,
                    Key: `${folder}/${filename}`
                }).promise();

                prm
                    .then((data) => {
                        const dt = data.Body.toString('utf-8');
                        resolve(dt);
                    })
                    .catch(reject);
            });
        }
    };
};

module.exports = UploaderRepository;
