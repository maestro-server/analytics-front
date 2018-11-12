'use strict';

var _ = require('lodash');
var $ = require('jquery');
var SVG = require('svg.js');


function AnimateLines(app) {
    var color = "#6b2626";
    var actived = false;

    var tooltip = $('#conn-tooltip');

    function resetPos(path, c) {
        var init = path.pointAt(0)
        c.finish();
        c.move(init.x - 2.5, init.y - 2);
        c.hide();
    }

    function animateMinis(path, vel, length, c) {

        c.show().animate(vel, '<>').during(function (pos, morph, eased) {
            var p = path.pointAt(eased * length)
            c.move(p.x - 2.5, p.y - 2)

            if(!actived)
                resetPos(path, c);

        }).loop(true);
    }

    function generateSetInterval(path, length, qtd, balls) {

        var vel = length * 1.6;
        var sl = vel / qtd;

        var i = 0;
        var timer = setInterval(function () {
            if(!actived)
                clearInterval(timer);

            if (i <= qtd) {
                if(balls[i] instanceof SVGEllipseElement)
                    balls[i] = balls[i].instance

                animateMinis(path, vel, length, balls[i]);
                i++;
            } else {
                clearInterval(timer);
            }
        }, sl);
    }

    function startAnimation(target) {

        var path = SVG.adopt(target);
        var length = path.length();

        if(length > 0) {
            var balls = $(target).parent().find('.mini-ell');
            var qtd = Math.round(length / 60);

            if (balls.length === 0) {
                for(var z = 0; z<=qtd; z++) {
                    var ball = path.parent().ellipse(5, 4).hide().fill(color).addClass('mini-ell');
                    balls.push(ball);
                }
            }

            generateSetInterval(path, length, qtd, balls);
        }
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
        var ptxt = txt.text()

        if (ptxt != 'None') {
            tooltip
                .offset({top: e.pageY, left: e.pageX})
                .text(ptxt)
                .addClass('show');
        }
    }

    function hideLabel() {
        tooltip
            .offset({top: 0, left: 0})
            .removeClass('show');
    }

    this.setup = function () {
        $('svg').find('.conector_h')
            .mouseover(this.actived)
            .mouseleave(this.desactived);
    };

    this.actived = function (e) {
        actived = true;
        if (!_.get(e, 'isTrigger'))
            showLabel(this, e);

        transfPath(this, color, 2);
        startAnimation(this);
    };

    this.desactived = function () {
        actived = false;

        hideLabel();
        transfPath(this, '#000', 1);
    };
}

module.exports = AnimateLines;