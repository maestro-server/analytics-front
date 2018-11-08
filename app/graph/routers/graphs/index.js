'use strict';

const authenticate = require('graph/middlewares/authenticate');

const Graph = require('../../entities/Graph');
const Team = require('../../entities/Teams');

const ViewGraph = require('../../applications/viewGraph');
const WrapperPersistenceApp = require('core/applications/wrapperPersistenceApplication')(Graph)(Team);
const WrapperPersistenceAppGraphs = WrapperPersistenceApp(ViewGraph);


module.exports = function (router) {

    router
        /**
         * @api {get} /teams/:id/graphs/:idu aa. Show UI graph tree
         * @apiName GetTeamUIGraph
         * @apiGroup Teams
         * @apiDescription Use for teams scope, have be all actions, params and option in /graphs/:id,
         *
         * @apiParam (Param) {String} id Team unique ID.
         * @apiParam (Param) {String} idu App unique ID.
         */
        .get('/teams/:id/graphs/:idu', authenticate(), WrapperPersistenceAppGraphs('view').findOne)
        /**
         * @api {get} /teams/:id/graphs/png/:idu ab. Download PNG of graph tree
         * @apiName GetPNGGraph
         * @apiGroup Teams
         * @apiDescription Use for teams scope, have be all actions, params and option in /graphs/png/:idu,
         *
         * @apiParam (Param) {String} id Team unique ID.
         * @apiParam (Param) {String} idu App unique ID.
         */
        .get('/teams/:id/graphs/png/:idu', authenticate(), WrapperPersistenceAppGraphs('png').findOne);
};