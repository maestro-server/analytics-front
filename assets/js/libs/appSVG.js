'use strict';

var SVG = require('svg.js');
var AppTooltip = require('./appTooltip.js');
var AnimateLines = require('./animateLines.js');
var MenuBar = require('./menuBar.js');
var ZoomPanSVG = require('./zoomPanSVG.js');


function AppSVG(svg) {
    this.app = null;
    this.root = null;

    this.setupSVGObject = function() {
        var qapp = document.querySelector("svg .svg-pan-zoom_viewport");
        this.app = SVG.adopt(qapp);

        var qobj = document.querySelector("svg");
        this.root = SVG.adopt(qobj);
    }

    this.setup = function() {
        var urlParams = new URLSearchParams(window.location.search);
        var jwt = urlParams.get('jwt');

        new ZoomPanSVG().setup();

        this.setupSVGObject();

        if (window.matchMedia("(min-width: 700px)").matches) {
            new AppTooltip(this.root, jwt).setup();
            new AnimateLines(this.app).setup();

            if (jwt)
                new MenuBar().setup();
        }

        
    };
}

module.exports = AppSVG;