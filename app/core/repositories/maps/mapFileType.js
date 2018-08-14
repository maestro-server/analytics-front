'use strict';

module.exports = function(type) {

    const maps = {
        "image/jpeg": "jpg",
        "image/gif": "gif",
        "image/png": "png",
        "text/xml": "xml",
        "text/html": "html"
    };

    if(maps[type] !== null && maps.hasOwnProperty(type)) {
        return maps[type];
    }

    return type;
};
