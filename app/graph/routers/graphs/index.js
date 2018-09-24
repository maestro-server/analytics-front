'use strict';

const authenticate = require('graph/middlewares/authenticate');

const Graph = require('../../entities/Graph');
const Team = require('../../entities/Teams');

const ViewGraph = require('../../applications/viewGraph');
const WrapperPersistenceApp = require('core/applications/wrapperPersistenceApplication')(Graph)(Team);
const WrapperPersistenceAppGraphs = WrapperPersistenceApp(ViewGraph);


module.exports = function (router) {

    router
        .get('/teams/:id/graphs/:idu', authenticate(), WrapperPersistenceAppGraphs('view').findOne)

        .get('/teams/:id/graphs/png/:idu', authenticate(), WrapperPersistenceAppGraphs('png').findOne);
};