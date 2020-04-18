'use strict';

var $ = require('jquery');
var Mustache = require('mustache');


function FactoryTemplate(id, obj, data) {
    var template = $(id).html();
    var html = Mustache.render(template, data);

    obj.html(html);
    return obj;
}

module.exports = FactoryTemplate;
