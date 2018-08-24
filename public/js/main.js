'use strict';


String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

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

function MetaInfo(data) {

    var obj = {
        'api': $('meta[name=api_url]').attr("content"),
        'id': $('meta[name=id]').attr("content")
    }
    return _.get(obj, data);
}

function ApiRequest(fn, query, uri='graphs') {
    var urlParams = new URLSearchParams(window.location.search);
    var jwt = urlParams.get('jwt')

    $.ajax({
        url: MetaInfo('api') + '/' + uri + '/' + query,
        headers: {
            'Authorization': 'jwt ' + jwt
        }
    })
    .fail(function() {
        alert( "error" );
    })
    .done(fn)
    .always(function() {
        
    });
}


function CreateBox() {

    function createBox(data) {
        var template = $('#tpl_clients').html();

        data['hasContacts'] = function() {
            return _.get(data, 'contacts');
        }

        var html = Mustache.to_html(template, data);

        $('#infobox')
            .html(html)
            .css({'left': 156})
            .addClass('opened');
    }

    this.info_box = function() {
        var id = $(this).data('id');
        var type = $(this).data('type');

        ApiRequest(createBox, id, type);
    };

    $('#infobox').mouseleave(function() {
        $(this).css({'left': -300});
    });

    $('#menu').find('.get_info').click(this.info_box);
}

function MenuBar() {

    function hist(result) {
        var arr = []
        var hist = _.get(result, 'info.histograms');

        for (var ht in hist) {
            var v = hist[ht];
            var h = v * 10;
            arr.push({'h': h, 'value': v});
        }

        return arr
    };

    function setupSlideToggle() {
        $('.menu li').hover(function(){
            $(this).find('ul').stop().slideToggle('fast');
        });
    };

    function map_families(k, v) {
        return {'name': v, 'qtd': k};
    }

    this.open = function(result) {

        result['families'] = _.map(_.get(result, 'ifamilies.items'), map_families);
        result['hist'] = hist(result);

        var template = $('#tpl_menu').html();
        var html = Mustache.to_html(template, result);

        $('#menu').html(html);

        new CreateBox();
        setupSlideToggle();
        $('#menu').addClass('opened');
    };



    this.setup = function () {
        ApiRequest(this.open, MetaInfo('id'));
    };
}

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

        new AppTooltip(this.root).setup();
        new AnimateLines(this.app).setup();
        new MenuBar().setup();
    }
}





$(document).ready(function() {
    var app = new AppSVG();
    app.setup();
});