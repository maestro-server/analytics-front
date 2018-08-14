'use strict';

const _ = require('lodash');

const DPersistenceServices = require('core/services/PersistenceServices');
const aclRoles = require('core/applications/transforms/aclRoles');
const Access = require('core/entities/accessRole');

const mapRelationToObjectID = require('core/applications/transforms/mapRelationToObjectID');

const {AnalyticsHTTPService} = require('core/services/HTTPService');

const ApplicationReport = (Entity, PersistenceServices = DPersistenceServices) => {

    return {
        view(req, res, next) {
            const data = {
                'svg': 'templates'
            }

            res.render('index', data);

        }
    };
};

module.exports = _.curry(ApplicationReport);
