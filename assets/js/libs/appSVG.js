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
        new ZoomPanSVG().setup();

        this.setupSVGObject();

        if (window.matchMedia("(min-width: 700px)").matches) {
            new AppTooltip(this.root).setup();
            new AnimateLines(this.app).setup();
            new MenuBar().setup();
        }

        
    }
}

module.exports = AppSVG;