'use strict';

const _ = require('lodash');

const DFactoryDBRepository = require('core/repositories/DBRepository');
const UploadHTML = require('graph/services/uploadHTML');


const ApplicationAnalytics = (Entity, FactoryDBRepository = DFactoryDBRepository) => {

    const DBRepository = FactoryDBRepository(Entity);

    return {
        create(req, res, next) {
            const data = Object.assign({}, req.body, req.user)
            
            if (data) {
                res.render('index', data, (err, out) => {
                    if (err)
                        next(err);
    
                    UploadHTML(Entity)(out, req.user)()
                        .then(e => res.json(e))
                        .catch(next);
                });
            }
        }
    };
};

module.exports = _.curry(ApplicationAnalytics);
