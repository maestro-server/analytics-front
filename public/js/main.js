'use strict';

function showTool(elementById, pos) {
    var x = pos.left - 40;
    var y = pos.top - 40;

    elementById
        .attr('display', 'block')
        .x(x)
        .y(y)
        .opacity(0)
        .animate(200, '>')
        .opacity(0.8)
        .x(x+10)
        .y(y+10);
}

function hiddenTool(elementById) {
    elementById
        .animate(200, '<')
        .opacity(0)
        .attr('display', 'none');
}

function getIdTool(id) {
    return '#tool-'+id;
}


function AppSVG(svg) {
    this.app = null;
    
    this.setup = function() {
        this.setupZoom();

        this.setupSVGObject();
        this.setupClicksTooltips();
        this.setupLineMouseHover();
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
            maxZoom:2
        });
    
        $(window).resize(function() {
            panZoom.resize();
            panZoom.fit();
            panZoom.center();
        });
    },

    this.setupClicksTooltips = function() {
        var cache = []
        var root = this.root;

        $('.boundaries').mouseover(function() {
            var id = $(this).attr('id');
            var elID = getIdTool(id);
            var elementById = root.select(elID);
    
            if (cache.indexOf(elID) == -1) {
                cache.push(elID);
                var use  = root.use('tool-'+id).addClass('tool');
            }
    
            var pos = $(this).position();
            showTool(elementById, pos);
           
        });
    
        $('.boundaries').mouseleave(function(e) {
            var pos =  $(this).position();
            var id = $(this).attr('id');
    
            if ($(e.toElement).hasClass('tool')) {
                $(e.toElement).mouseleave(function() {
                    var elementById = root.select(getIdTool(id));
    
                    hiddenTool(elementById);
                    $(this).off('mouseleave');
                })
            } else {
                var elementById = root.select(getIdTool(id));
                hiddenTool(elementById);
            }
            
        })
    },

    this.setupLineMouseHover = function() {
        var app = this.app;
        var time = 0;

        function overed(obj) {
            var path = SVG.adopt(obj);

            for(var i=0; i<=4; i++) {
                setTimeout(function(){
                    var svg = document.querySelector(".svg-pan-zoom_viewport");
                    var ed = SVG(svg)
    
                    var c1 = app.ellipse(5, 4).addClass('tmp');
                    var length = path.length();
    
    
                    c1.animate(1000, '<>').during(function(pos, morph, eased){
                        var p = path.pointAt(eased * length)
    
                        c1.move(p.x-2.5, p.y-2)
                    }).loop(true)
    
                 }, time);
    
                time += 300;

            }
        }

        $('.conector').mouseover(function(e) {
            var path = SVG.adopt(this);
            path.attr({
                stroke: '#6b2626',
                'stroke-width': 1.5
            });

            overed(this);

            

        });

        $('.conector').mouseleave(function(e) {
            var path = SVG.adopt(this);
            path.attr({
                stroke: '#000',
                'stroke-width': 1
            });
            $('.tmp').remove();
        });
    }
    
}




$(document).ready(function() {
    var app = new AppSVG();
    app.setup();
});