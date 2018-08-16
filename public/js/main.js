'use strict';

function setupZoom() {
    var panZoom = svgPanZoom('#graph', {
        zoomEnabled: true,
        controlIconsEnabled: true,
        fit: true,
        center: true,
        dblClickZoomEnabled: false,
        maxZoom:2
    });

    $(window).resize(function() {
        panZoom.resize();
        panZoom.fit();
        panZoom.center();
    });
}

// clicks
function setupClicksTooltips() {
    var svg = document.querySelector("svg");
    var GSVG = SVG.adopt(svg);


    var cache = []

    $('.boundaries').mouseover(function() {
        var id = $(this).attr('id');

        var pos =  $(this).position();

        var elID = '#tool-'+id;

        var elementById = GSVG.select(elID);

        if (cache.indexOf(elID) == -1) {
            cache.push(elID);
            var use  = GSVG.use('tool-'+id).addClass('tool');
        }

        var x = pos.left - 40
        var y = pos.top - 40
        elementById
            .attr('display', 'block')
            .opacity(0)
            .x(x)
            .y(y)
            .animate(200, '>')
            .opacity(0.8)
            .x(x+10)
            .y(y+10);
    });

    $('.boundaries').mouseleave(function(e) {
        if ($(e.toElement).hasClass('tool')) {
            $(e.toElement).mouseleave(function() {
                console.log("okk");
            })
            return
        }


        var id = $(this).attr('id');

        var elementById = GSVG.select('#tool-'+id);
        var pos =  $(this).position();
        var x = pos.left - 40
        var y = pos.top - 40

        
    });

    function hiddenTool() {
        elementById
            .animate(200, '<')
            .opacity(0)
            .x(x-10)
            .y(y-10)
            .attr('display', 'none');
    }

    
}



$(document).ready(function() {
    setupZoom();
    setupClicksTooltips();
});