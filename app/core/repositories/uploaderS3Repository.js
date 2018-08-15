'use strict';

const _ = require('lodash');
const aws = require('aws-sdk');
const mapsFile = require('./maps/mapFileType');
const UploaderError = require('core/errors/factoryError')('UploaderError');

const factoryValid = require('core/libs/factoryValid');
const s3Valid = require('core/validators/s3_valid');


const UploaderRepository = (folder) => {

    factoryValid(
        _.pick(process.env, ['AWS_S3_BUCKET_NAME', 'AWS_ACCESS_KEY_ID', 'AWS_SECRET_ACCESS_KEY']),
        s3Valid
    );

    return {

        upload(out, folder, filename, filetype="text/html") {
            const s3 = new aws.S3();
            const S3_BUCKET = process.env.AWS_S3_BUCKET_NAME;
            const PATH = S3_BUCKET + '/' + folder;


            return s3.putObject({
                Bucket: PATH,
                Key: filename,
                ContentType: filetype,
                Body: out
            }).promise();
        }
    };
};

module.exports = UploaderRepository;
