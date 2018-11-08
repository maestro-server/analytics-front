'use strict';

var $ = require('jquery');
var MetaInfo = require('./metaInfo.js');


function ApiRequest(fn, query, path) {
    var urlParams = new URLSearchParams(window.location.search);
    var jwt = urlParams.get('jwt');

    var uri = window.location.pathname.split('/');
    if(uri[1] == 'teams')
        path = uri[1] + '/' + uri[2] + '/' + path;

    $.ajax({
        url: MetaInfo('api') + '/' + path + '/' + query,
        headers: {
            'Authorization': 'jwt ' + jwt
        }
    })
    .done(fn);
}

module.exports = ApiRequest;