'use strict';

var _ = require('lodash');
var $ = require('jquery');
var SVG = require('svg.js');


function AnimateLines(app) {
    var color="#6b2626";
    var actived = false;

    var tooltip = $('#conn-tooltip');

    function animateMinis(path) {
        var length = path.length();

        var c = path.parent().ellipse(5, 4).fill(color).addClass('mini-ell');
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
        actived = true;

        if (!_.get(e, 'isTrigger'))
            showLabel(this, e);
        
        transfPath(this, color, 2);
        startAnimation(this);
    };

    this.desactived = function() {
        actived = false;

        hideLabel();
        transfPath(this, '#000', 1);
    };
}

module.exports = AnimateLines;