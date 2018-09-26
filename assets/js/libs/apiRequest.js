'use strict';

var $ = require('jquery');
var MetaInfo = require('./metaInfo.js');


function ApiRequest(fn, query, uri) {
    var urlParams = new URLSearchParams(window.location.search);
    var jwt = urlParams.get('jwt');

    $.ajax({
        url: MetaInfo('api') + '/' + uri + '/' + query,
        headers: {
            'Authorization': 'jwt ' + jwt
        }
    })
    .done(fn);
}

module.exports = ApiRequest;