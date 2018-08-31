'use strict';

const authenticate = require('graph/middlewares/authenticate');
const authenticate_analytics = require('graph/middlewares/authenticate_back');

const Graph = require('../../entities/Graph');
const PersistenceGraph = require('../../applications/persistenceGraph')(Graph);
const ViewGraph = require('../../applications/viewGraph')(Graph)();


module.exports = function (router) {

    router
        .get('/:id', authenticate(), ViewGraph.view)

        .get('/png/:id', authenticate(), ViewGraph.png)

        .post('/', authenticate_analytics(), PersistenceGraph.create);
};