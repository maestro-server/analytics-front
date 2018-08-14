'use strict';
require('app-module-path').addPath(`${__dirname}/../../app`); //make more realiable to call modules

require('dotenv').config({path: '.env.test'});

let chai = require('chai'),
    {expect} = chai,
    sinon = require('sinon'),
    chaiAsPromised = require("chai-as-promised"),
    cleaner_db = require('../e2e/libs/cleaner_db'),
    _ = require('lodash');

chai.use(chaiAsPromised);


describe('integration - core', function () {

    describe('repositories', function () {


        describe('DBRepository', function () {
            const Entity = require('./libs/entities/Tester');
            const DBRepository = require('core/repositories/DBRepository');
            let app = require('./libs/bootDB');

            const data = {name: "name", notHave: "notHave", unique_id: "catchme", increment: 0, roles: ['tester']};

            before(function (done) {
                cleaner_db([{tb: 'testers'}], () => {
                    app(done);
                }, null);
            });


            describe('create', function () {
                it('create', function (done) {
                    const tt = DBRepository(Entity).create(data);

                    expect(tt).to.fulfilled
                        .and.to.eventually.have.property("name")
                        .and.to.eventually.not.have.property("notHave")
                        .and.notify(done);
                });

                it('create 2', function (done) {
                    const post = {name: "name2"};

                    const tt = DBRepository(Entity).create(_.assign({}, data, post));

                    expect(tt).to.fulfilled
                        .and.to.eventually.have.property("name")
                        .and.to.eventually.not.have.property("notHave")
                        .and.notify(done);

                });
            });

            describe('find', function () {
                it('find', function (done) {
                    const tt = DBRepository(Entity).find({}, 1, 1);

                    expect(tt)
                        .to.be.fulfilled
                        .and.to.eventually.have.nested.property("[0].name")
                        .and.notify(done);
                });
            });

            describe('update', function () {
                it('update', function (done) {
                    const {unique_id} = data;
                    const tt = DBRepository(Entity).update({unique_id}, {name: "change"});

                    expect(tt)
                        .to.be.fulfilled
                        .and.to.eventually.have.property("name")
                        .and.notify(done);
                });
            });

            describe('updateByPushUnique', function () {
                it('updateByPushUnique', function (done) {
                    const {unique_id} = data;
                    const tt = DBRepository(Entity).updateByPushUnique({unique_id}, {roles: "putme"});

                    expect(tt)
                        .to.be.fulfilled
                        .and.to.eventually.have.property("roles")
                        .and.notify(done);
                });
            });

            describe('updateByPull', function () {
                it('updateByPull', function (done) {
                    const {unique_id} = data;
                    const tt = DBRepository(Entity).updateByPull({unique_id}, {roles: "putme"});

                    expect(tt)
                        .to.be.fulfilled
                        .and.to.eventually.have.property("roles")
                        .and.notify(done);
                });
            });

            describe('patch', function () {
                it('patch', function (done) {
                    const {unique_id} = data;
                    const tt = DBRepository(Entity).patch({unique_id}, {name: "change patch"});

                    expect(tt)
                        .to.be.fulfilled
                        .and.to.eventually.have.property("name").to.be.equal("change patch")
                        .and.notify(done);
                });
            });

            describe('increment', function () {
                it('increment', function (done) {
                    const tt = DBRepository(Entity).increment({unique_id: "catchme"}, {increment: 1});

                    expect(tt)
                        .to.be.fulfilled
                        .and.to.eventually.have.property("increment").to.be.equal(1)
                        .and.notify(done);
                });
            });

            describe('test update', function () {
                it('test update', function (done) {
                    const tt = DBRepository(Entity).findOne({name: "change"});

                    expect(tt)
                        .to.be.fulfilled
                        .and.to.eventually.have.property("name")
                        .and.notify(done);
                });
            });
        });


    });

});
