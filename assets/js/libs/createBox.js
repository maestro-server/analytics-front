'use strict';

var _ = require('lodash');
var $ = require('jquery');
var FactoryTemplate = require('./factoryTemplate.js');
var ApiRequest = require('./apiRequest.js');


function CreateBox() {

    function check(data, filter) {
        return _.has(data, filter);
    }

    function createBox(data) {
        data['hasContacts'] = check(data, 'contacts');
        data['hasEntry'] = check(data, 'entry');
        data['hasTags'] = check(data, 'tags');
        
       FactoryTemplate('#tpl_info', $('#infobox'), data)
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

module.exports = CreateBox;