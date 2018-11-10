'use strict';

var $ = require('jquery');
var FactoryTemplate = require('./factoryTemplate.js');
var ApiRequest = require('./apiRequest.js');


function AppTooltip(app, clk=true) {
    var tooltip = $('#app-tooltip');
    var lock = null;

    var connectors = $('.svg-pan-zoom_viewport .conector_h');

    function eachTspan(target) {
        var app = []
        $(target).find('tspan').each(function() {
            app.push({
                'key':  $(this).attr('class'), 
                'value': $(this).text()
            });
        });
        return app;
    }

    function showTool(target, e) {
        var data = {
            'app': eachTspan(target),
            'id': $(target).attr('id')
        };

        FactoryTemplate('#tpl_tooltip', tooltip, data)
            .offset({ top : e.pageY -50, left: e.pageX + 10})
            .addClass('show');
    }

    function getIdTool(id) {
        return '#tool-'+id;
    }

    function activeLines(id) {
        connectors.filter('.conn-'+id).trigger('mouseenter');
    }

    function desactiveLines(id) {
        connectors.filter('.conn-'+id).trigger('mouseleave');
    }

    function hiddenTool(target) {
        lock = null;
        var id = $(target).attr('id');

        desactiveLines(id);
        target.removeClass('glowing');

        tooltip
            .removeClass('show');
    }


    function cal_wid(that) {
        var wid = $(that).width() + $(that).position().left + 50;
        var lim = $( window ).width() - $(that).width() - 110;

        if (wid > lim)
            wid = $(that).position().left - $(that).width() - 60;
        
        return wid;
    }

    this.setup = function() {
        $('.boundaries')
            .mouseover(this.actived)
            .mouseleave(this.desactived);
    };

    this.actived = function(e) {
        var id = $(this).attr('id');


        if (id != lock) {
            lock = id;
            var elID = getIdTool(id);
            var obj = $(elID);

            showTool(obj, e);
            activeLines(id);
            $(this).addClass('glowing');
        }
    };

    this.desactived = function(e) {
        var that = $(this);

        if ($(e.toElement).hasClass('apptlp')) {
            $(e.toElement).mouseleave(function() {
                if (!$(e.toElement).hasClass('app-tooltip')) {
                    hiddenTool(that);
                    $(this).off('mouseleave');
                }
            });
        } else {
            hiddenTool(that);
        }
    };

    if (clk) {
        $('#app-tooltip').click(function(e) {
            var id = $(this).find('a').data('id');
            id = id.replace('tool-', '');
    
            var that = this;
    
            ApiRequest(function(data){
                var wid = cal_wid(that);
     
                FactoryTemplate('#tpl_info', $('#infobox'), data)
                    .css({'left': wid})
                    .addClass('opened');
            }, id, 'applications');        
        });
    };
}
module.exports = AppTooltip;