'use strict';

const svg_to_png = require('svg-to-png');


module.exports = (Upload) => {

    return new Promise((resolve, reject) => {

        svg_to_png.convert(
            Upload.getFullPath('svg'), Upload.getFolder())
            .then(() => resolve(Upload.getFullPath()))
            .catch(reject);
    });
};