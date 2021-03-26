const chai = require('chai');
const chaiHttp = require('chai-http');
const express = require('express');

require('dotenv').config();

const { resolve } = require('../../src/dependencies');

const restApiService = resolve('restApiService');

const { start, stop } = restApiService;

const app = start();

chai.use(chaiHttp);
chai.should();

describe('GET', () => {
  after(() => {
    stop();
  });
  it('gets!', (done) => {
    chai.request(app)
      .get('/team/deliveries?name=joe&name=donkey&instructions=^v^v^v^v^v')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.deep.equal({ n: 11 });
        done();
      });
  });
});
