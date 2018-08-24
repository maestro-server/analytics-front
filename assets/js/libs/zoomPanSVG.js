'use strict';

var $ = require('jquery');
var svgPanZoom = require('svg-pan-zoom');


function ZoomPanSVG() {

    this.setup = function () {
        var panZoom = svgPanZoom('#graph', {
            zoomEnabled: true,
            controlIconsEnabled: true,
            fit: true,
            center: true,
            dblClickZoomEnabled: false,
            maxZoom:4
        });
    
        $(window).resize(function() {
            panZoom.resize();
            panZoom.fit();
            panZoom.center();
        });
    }
}

module.exports = ZoomPanSVG;