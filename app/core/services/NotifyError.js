'use strict';

const _ = require('lodash');
const DPersistenceServices = require('core/services/PersistenceServices');
const Graph = require('graph/entities/Graph');


const NotifyError = (data, err, PersistenceServices = DPersistenceServices) => {

    if(_.has(data, 'graph_id') && _.has(data, 'owner_id')) {

        const owner = {'_id': _.get(data, 'owner_id')};
        const post = {'status': 'error', 'msg': err};

        PersistenceServices(Graph)
            .patch(data['graph_id'], post, owner)
            .catch(console.error);
    }
};

module.exports = NotifyError;
