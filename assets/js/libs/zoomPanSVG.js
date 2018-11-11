'use strict';

var $ = require('jquery');
var svgPanZoom = require('svg-pan-zoom');
var MetaInfo = require('./metaInfo.js');


function ZoomPanSVG() {

    var panZoom = null;

    function ajustZoom() {
        var qtd = MetaInfo('total', 4);

        if (qtd<4) {
            //panZoom.zoomBy(qtd/4);
        }
    };

    this.setup = function () {
        panZoom = svgPanZoom('#graph', {
            zoomEnabled: true,
            controlIconsEnabled: true,
            fit: true,
            center: true,
            dblClickZoomEnabled: false,
            maxZoom:4
        });

        ajustZoom();

        $(window).resize(function() {
            panZoom.resize();
            panZoom.fit();
            panZoom.center();
            ajustZoom();
        });
    };
}

module.exports = ZoomPanSVG;