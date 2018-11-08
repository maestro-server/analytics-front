'use strict';

const authenticate = require('graph/middlewares/authenticate');
const authenticate_public = require('graph/middlewares/authenticate_public');
const authenticate_analytics = require('graph/middlewares/authenticate_back');

const Graph = require('../../entities/Graph');
const PersistenceGraph = require('../../applications/persistenceGraph')(Graph);
const ViewGraph = require('../../applications/viewGraph')(Graph);


module.exports = function (router) {

    router
        /**
         *
         * @api {get} / Ping
         * @apiName GetPing
         * @apiGroup Ping
         *
         *
         * @apiSuccessExample {json} Success-Response:
         *     HTTP/1.1 200 OK
         *     {
             *        app: (String),
             *        description: (String),
             *        version: (Float),
             *        api_timeout: (Number)
             *     }
         */

        /**
         * @api {get} /graphs/:id a. Show UI Graph
         * @apiName GetUIGraph
         * @apiGroup Graphs
         *
         * @apiParam (Query) {String} [token] Authorization JWT {Token}
         * @apiParam (Query) {String} ext Type of extension [Default svg, can be png]
         *
         * @apiParam (Param) {String} id Graph Tree unique id.
         *
         * @apiPermission JWT (Read | Write | Admin)
         *
         * @apiError (Error) PermissionError Token don`t have permission
         * @apiError (Error) Unauthorized Invalid Token
         *
         * @apiSuccessExample {json} Success-Response:
         *     HTTP/1.1 200 OK
         *     HTML
         */
        .get('/:id', authenticate(), ViewGraph.view)
        /**
         * @api {get} /graphs/png/:id b. Download PNG
         * @apiName GetPNGGraph
         * @apiGroup Graphs
         *
         * @apiParam (Query) {String} [token] Authorization JWT {Token}
         *
         * @apiParam (Param) {String} id Graph Tree unique id.
         *
         * @apiPermission JWT (Read | Write | Admin)
         *
         * @apiError (Error) PermissionError Token don`t have permission
         * @apiError (Error) Unauthorized Invalid Token
         *
         * @apiSuccessExample {json} Success-Response:
         *     HTTP/1.1 200 OK
         *     HTML
         */
        .get('/png/:id', authenticate(), ViewGraph.png)
        /**
         * @api {get} /graphs/public/:id c. Show public UI Graph
         * @apiName GetPublicGraph
         * @apiGroup Graphs
         *
         * @apiParam (Query) {String} [token] Authorization JWT {Token}
         *
         * @apiParam (Param) {String} id Graph Tree unique id.
         *
         * @apiPermission JWT (Read | Write | Admin)
         *
         * @apiError (Error) PermissionError Token don`t have permission
         * @apiError (Error) Unauthorized Invalid Token
         *
         * @apiSuccessExample {json} Success-Response:
         *     HTTP/1.1 200 OK
         *     HTML
         */
        .get('/public/:id', authenticate_public(), ViewGraph.public)
        /**
         * @api {post} /graphs d. Create Graph
         * @apiName CreateGraph
         * @apiGroup Graphs
         *
         * @apiParam (Body x-www) {String} [graph_id] Graph ID
         * @apiParam (Body x-www) {String} [owner_id] Owner ID
         * @apiParam (Body x-www) {String} [payload] XML/Svg text (Will be used to create a new file)
         *
         *
         * @apiPermission JWT Analytics (Contract)
         * @apiHeader (Header) {String} Authorization JWT {Token}
         *
         * @apiError (Error) PermissionError Token don`t have permission
         * @apiError (Error) Unauthorized Invalid Token
         *
         * @apiSuccessExample {json} Success-Response:
         *     HTTP/1.1 201 OK
         *     {}
         */
        .post('/', authenticate_analytics(), PersistenceGraph.create);
};