'use strict';

function AnimateLines(app, color="#6b2626") {
    this.name = "AnimateLines";
    var actived = false;

    var tooltip = $('#conn-tooltip');

    function animateMinis(path) {
        var length = path.length();
        var c = app.ellipse(5, 4).fill(color).addClass('mini-ell');

        var vel = 500 + length

        c.animate(vel, '<>').during(function (pos, morph, eased) {
            var p = path.pointAt(eased * length)

            c.move(p.x - 2.5, p.y - 2)
        }).after(function () {
            c.remove();
        });
    }

    function startAnimation(target) {
        var path = SVG.adopt(target);
        animateMinis(path);

        var timer = setInterval(function() {
            if (actived) {
                animateMinis(path);

                if (!actived)
                    clearInterval(timer);
            } else {
                clearInterval(timer);
            }
        }, 100);
    }

    function transfPath(target, stk, stkw) {
        var obj = $(target).parent().find('.conector')[0];
        var path = SVG.adopt(obj);

        path.attr({
            stroke: stk,
            'stroke-width': stkw
        });
    }

    function showLabel(target, e) {
        var txt = $(target).parent().find('text');

        tooltip
            .offset({ top : e.pageY, left: e.pageX})
            .text(txt.text())
            .addClass('show');
    }

    function hideLabel() {
        tooltip
            .offset({ top : 0, left: 0})
            .removeClass('show');
    }

    this.setup = function() {
        $('svg').find('.conector_h')
            .mouseover(this.actived)
            .mouseleave(this.desactived);
    };

    this.actived = function(e) {
        actived = true

        showLabel(this, e);
        transfPath(this, color, 2);
        startAnimation(this);
    };

    this.desactived = function() {
        actived = false

        hideLabel();
        transfPath(this, '#000', 1);
    };
}


function AppTooltip(app) {
    this.name = "AppTooltip";

    var tooltip = $('#app-tooltip');

    function showTool(target, e) {
        var ul = tooltip.find('ul');
        ul.empty();

        $(target).find('tspan').each(function() {
            var vl = $(this).text();
            var ky = $(this).attr('class');

            var apd = "<b>"+ky+":</b> <span>"+vl+"</span>";

            ul.append("<li>"+apd+"</li>");
        });

        tooltip
            .offset({ top : e.pageY, left: e.pageX})
            .addClass('show');
    }

    function hiddenTool(target) {
        target.removeClass('glowing');

        tooltip
            .removeClass('show');
    }

    function getIdTool(id) {
        return '#tool-'+id;
    }

    this.setup = function() {
        $('.boundaries')
            .mouseover(this.actived)
            .mouseleave(this.desactived);
    };

    this.actived = function(e) {
        var id = $(this).attr('id');
        var elID = getIdTool(id);
        var obj = $(elID)

        showTool(obj, e);
        $(this).addClass('glowing');
    };

    this.desactived = function(e) {
        var that = $(this);

        if ($(e.toElement).hasClass('apptlp')) {
            $(e.toElement).mouseleave(function() {
                hiddenTool(that);
                $(this).off('mouseleave');
            });
        } else {
            hiddenTool(that);
        }

        
    };
}

function AppSVG(svg) {
    this.app = null;
    
    this.setup = function() {
        this.setupZoom();
        this.setupSVGObject();

        var AToolTips = new AppTooltip(this.root);
        AToolTips.setup();

        var ALines = new AnimateLines(this.app);
        ALines.setup();
    },

    this.setupSVGObject = function() {
        var qapp = document.querySelector("svg .svg-pan-zoom_viewport");
        this.app = SVG.adopt(qapp);

        var qobj = document.querySelector("svg");
        this.root = SVG.adopt(qobj);
    },

    this.setupZoom = function () {
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




$(document).ready(function() {
    var app = new AppSVG();
    app.setup();

    $('.menu li').hover(function(){
        $(this).find('ul').slideToggle('fast');
    });
});