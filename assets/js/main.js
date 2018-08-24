'use strict';

String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

var $ = require('jquery');
var AppSVG = require('./libs/appSVG');


$(document).ready(function() {
    var app = new AppSVG();
    app.setup();
});