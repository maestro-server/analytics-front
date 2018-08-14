'use strict';

const authenticate = require('identity/middlewares/authenticate');
const authenticate_analytics = require('graph/middlewares/authenticate');

const Graph = require('../../entities/Graph');
const PersistenceGraph = require('../../applications/persistenceGraph')(Graph);
const ViewGraph = require('../../applications/viewGraph')(Graph);


module.exports = function (router) {

    router
        .get('/:id', ViewGraph.view)

        .post('/', authenticate_analytics(), PersistenceGraph.create);
};
