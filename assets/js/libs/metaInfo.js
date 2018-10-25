'use strict';

var $ = require('jquery');
var _ = require('lodash');

function MetaInfo(data, def=null) {

    var obj = {
        'api': $('meta[name=api_url]').attr("content"),
        'id': $('meta[name=id]').attr("content"),
        'total': $('meta[name=total]').attr("content")
    }
    return _.get(obj, data, def);
}

module.exports = MetaInfo;