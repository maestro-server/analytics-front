'use strict';

var _ = require('lodash');
var $ = require('jquery');
var MetaInfo = require('./metaInfo.js');
var CreateBox = require('./createBox.js');
var ApiRequest = require('./apiRequest.js');
var FactoryTemplate = require('./factoryTemplate.js');


function MenuBar() {

    function hist(result) {
        var arr = []
        var hist = _.get(result, 'info.histograms');

        for (var ht in hist) {
            var v = hist[ht];
            var h = v * 10;
            arr.push({'h': h, 'value': v});
        }

        return arr;
    };

    function setupSlideToggle() {
        $('.menu li').hover(function(){
            $(this).find('ul').stop().slideToggle('fast');
        });
    };

    function map_families(k, v) {
        return {'name': v, 'qtd': k};
    };

    this.open = function(result) {
        result['families'] = _.map(_.get(result, 'ifamilies.items'), map_families);
        result['hist'] = hist(result);

        result['hasClients'] = _.get(result, 'iclients.total') > 0;
        result['hasSystems'] = _.get(result, 'isystems.total') > 0;

        FactoryTemplate('#tpl_menu', $('#menu'), result)
            .addClass('opened');

        new CreateBox();
        setupSlideToggle();
    };

    this.setup = function () {
        var end = 'graphs'

        ApiRequest(this.open, MetaInfo('id'), end);
    };
}
module.exports = MenuBar;