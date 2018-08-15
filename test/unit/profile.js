'use strict';
require('app-module-path').addPath(`${__dirname}/../../app`); //make more realiable to call modules

require('dotenv').config({path: '.env.test'});

let chai = require('chai'),
    {expect} = chai,
    sinon = require('sinon'),
    chaiAsPromised = require("chai-as-promised");

chai.use(chaiAsPromised);


describe('unit - profile', function () {

    it('config - auth_config', function (done) {
        const config = require('graph/config/auth_config')();

        expect(config).to.have.property('jwtSecret')
            .to.have.property('secretOrKey');

        expect(config).to.have.property('jwtSession')
            .to.have.property('session', false);

        done();
    });


});
