'use strict';

var $ = require('jquery');
var _ = require('lodash');

function MetaInfo(data) {

    var obj = {
        'api': $('meta[name=api_url]').attr("content"),
        'id': $('meta[name=id]').attr("content")
    }
    return _.get(obj, data);
}

module.exports = MetaInfo;