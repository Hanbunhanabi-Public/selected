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

const {Hotel} = require('../../models/hotel.model');

chai.use(chaiHttp);

describe('hotel routes', () => {
  beforeEach(async done => {
    mongoose.connect(testURI, {
      useNewUrlParser: true,
      useCreateIndex: true,
    });
    Hotel.remove({});
    done();
  });

  afterEach(async () => {
    nock.cleanAll();
    await Hotel.deleteMany({});
    await mongoose.disconnect();
  });

  it('should get all hotels', done => {
    chai
      .request(server)
      .get('/hotel/trip/5e6aeefdb3256d55d6091d82')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.length.should.be.eql(0);
        done();
      });
  });

  it('should get a list of hotels via api', done => {
    chai
      .request(server)
      .post('/hotel/api')
      .send({
        location: 'Canada',
        rooms: '1',
        nights: '2',
        checkIn: '2020-04-20',
        adults: '1',
      })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.length.should.be.eql(5);
        done();
      });
  }).timeout(10000);

  it('should add a new hotel', done => {
    chai
      .request(server)
      .post('/hotel/add/5e6aeefdb3256d55d6091d82')
      .send({name: 'Test Hotel', location: 'Test Location'})
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.eql('Hotel added!');
        done();
      });
  });

  it('should get a hotel by the given id', done => {
    const hotel = new Hotel({
      name: 'Test Hotel',
      location: 'Test Location',
    });
    hotel.save((err, hotl) => {
      chai
        .request(server)
        // eslint-disable-next-line no-underscore-dangle
        .get(`/hotel/${hotl._id}`)
        .end((error, res) => {
          res.should.have.status(200);
          res.body.should.have.property('name');
          res.body.should.have.property('location');
          done();
        });
    });
  });

  it('should DELETE a hotel by the given id', done => {
    const hotel = new Hotel({
      name: 'Test Hotel',
      location: 'Test Location',
    });
    hotel.save((err, hotl) => {
      chai
        .request(server)
        // eslint-disable-next-line no-underscore-dangle
        .delete(`/hotel/${hotl._id}`)
        .end((error, res) => {
          res.should.have.status(200);
          res.body.should.be.eql('Hotel deleted.');
          done();
        });
    });
  });

  it('it should UPDATE a hotel', done => {
    const hotel = new Hotel({
      name: 'Test Hotel',
      location: 'Test Location',
    });
    hotel.save((err, hotl) => {
      chai
        .request(server)
        // eslint-disable-next-line no-underscore-dangle
        .post(`/hotel/update/${hotl._id}`)
        .send({number: 'Another Test Hotel', location: 'Another Test Location'})
        .end((error, res) => {
          res.should.have.status(200);
          res.body.should.be.eql('Hotel updated!');
          done();
        });
    });
  });
});
