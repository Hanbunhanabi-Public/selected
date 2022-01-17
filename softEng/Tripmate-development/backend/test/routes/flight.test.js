process.env.NODE_ENV = 'test';

const {describe, it, beforeEach, afterEach} = require('mocha');
const mongoose = require('mongoose');

const chai = require('chai');
const chaiHttp = require('chai-http');
const nock = require('nock');
const {testURI} = require('../testURI');
const server = require('../../server');

// eslint-disable-next-line no-unused-vars
const should = chai.should();

const {Flight} = require('../../models/flight.model');

chai.use(chaiHttp);

describe('flight routes', () => {
  beforeEach(async done => {
    mongoose.connect(testURI, {
      useNewUrlParser: true,
      useCreateIndex: true,
    });
    Flight.remove({});
    done();
  });

  afterEach(async () => {
    nock.cleanAll();
    await Flight.deleteMany({});
    await mongoose.disconnect();
  });

  it('it should get all flights', done => {
    chai
      .request(server)
      .get('/flight/trip/5e6aeefdb3256d55d6091d82')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.length.should.be.eql(0);
        done();
      });
  });

  it('it add should add a new flight manually', done => {
    chai
      .request(server)
      .post('/flight/add_manual/5e6aeefdb3256d55d6091d82')
      .send({number: 'ABC123', date: '2020-01-01'})
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.eql('Flight added!');
        done();
      });
  });

  it('it should add a new flight via api', done => {
    nock('/flight/add_api/5e6aeefdb3256d55d6091d82')
      .get('/AC90/2020-03-27')
      .query({
        withLocation: false,
        withAircraftImage: false,
      })
      .reply(200, {message: 'Flight added!'});

    chai
      .request(server)
      .post('/flight/add_api/5e6aeefdb3256d55d6091d82')
      .send({number: 'AC90', date: '2020-03-27'})
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.eql('Flight added!');
        done();
      });
  });

  it('it should GET a flight by the given id', done => {
    const flight = new Flight({
      number: 'ABC123',
      date: '2020-01-01',
    });
    flight.save((err, flig) => {
      chai
        .request(server)
        // eslint-disable-next-line no-underscore-dangle
        .get(`/flight/${flig._id}`)
        .end((error, res) => {
          res.should.have.status(200);
          res.body.should.have.property('number');
          done();
        });
    });
  });

  it('it should DELETE a flight by the given id', done => {
    const flight = new Flight({
      number: 'ABC123',
      date: '2020-01-01',
    });
    flight.save((err, flig) => {
      chai
        .request(server)
        // eslint-disable-next-line no-underscore-dangle
        .delete(`/flight/${flig._id}`)
        .end((error, res) => {
          res.should.have.status(200);
          res.body.should.be.eql('Flight deleted.');
          done();
        });
    });
  });

  it('it should UPDATE a flight', done => {
    const flight = new Flight({
      number: 'ABC123',
      date: '2020-01-01',
    });
    flight.save((err, flig) => {
      chai
        .request(server)
        // eslint-disable-next-line no-underscore-dangle
        .post(`/flight/update/${flig._id}`)
        .send({number: 'DEF456'})
        .end((error, res) => {
          res.should.have.status(200);
          res.body.should.be.eql('Flight updated!');
          done();
        });
    });
  });
});
