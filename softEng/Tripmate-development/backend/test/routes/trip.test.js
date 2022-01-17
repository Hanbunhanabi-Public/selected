process.env.NODE_ENV = 'test';

const {describe, it, beforeEach, afterEach} = require('mocha');
const mongoose = require('mongoose');

const chai = require('chai');
const chaiHttp = require('chai-http');
const {testURI} = require('../testURI');
const server = require('../../server');

// eslint-disable-next-line no-unused-vars
const should = chai.should();

const {User} = require('../../models/user.model');
const {Trip} = require('../../models/trip.model');

chai.use(chaiHttp);

describe('trip routes', () => {
  beforeEach(async done => {
    mongoose.connect(testURI, {
      useNewUrlParser: true,
      useCreateIndex: true,
    });

    Trip.remove({});
    User.remove({});
    done();
  });

  afterEach(async () => {
    await Trip.deleteMany({});
    await User.deleteMany({});
  });

  it('/ should get all trips of :userId', done => {
    const user = new User({
      name: 'JoeMama',
      email: 'BEP@tonightisgonnabeagoodnight.ca',
      password: 'LetsgetitStarted',
    });

    user.save((error, ret) => {
      chai
        .request(server)
        .get(`/trip/user/${ret._id}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.length.should.be.eql(0);
          done();
        });
    });
  });

  it('/add should add a new trip', done => {
    const user = new User({
      name: 'JoeMama',
      email: 'BEP@tonightisgonnabeagoodnight.ca',
      password: 'LetsgetitStarted',
    });
    user.save((error, ret) => {
      chai
        .request(server)
        .post(`/trip/add/${ret._id}`)
        .send({
          tripname: 'new',
          startDate: '2020-01-01',
          endDate: '2020-01-02',
        })
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.eql('Trip added.');
          chai
            .request(server)
            .get(`/trip/user/${ret._id}`)
            .end((err2, res2) => {
              res2.should.have.status(200);
              res2.body.length.should.be.eql(1);
              done();
            });
        });
    });
  });

  it('/trip/:id should get an event by the given id', done => {
    const user = new User({
      name: 'JoeMama',
      email: 'BEP@tonightisgonnabeagoodnight.ca',
      password: 'LetsgetitStarted',
    });
    user.save((err, usr) => {
      const trip = new Trip({
        tripname: 'new',
        userId: `${usr._id}`,
        startDate: '2020-01-01',
        endDate: '2020-01-02',
      });

      trip.save((err2, trp) => {
        chai
          .request(server)
          // eslint-disable-next-line no-underscore-dangle
          .get(`/trip/${trp._id}`)
          .end((error, res) => {
            res.should.have.status(200);
            res.body.should.have.property('tripname');
            res.body.should.have.property('userId');
            res.body.should.have.property('startDate');
            res.body.should.have.property('endDate');
            done();
          });
      });
    });
  });

  it('DELETE /trip/:id should delete the trip and everything connected to it', done => {
    const user = new User({
      name: 'JoeMama',
      email: 'BEP@tonightisgonnabeagoodnight.ca',
      password: 'LetsgetitStarted',
    });

    user.save((err, usr) => {
      const trip = new Trip({
        tripname: 'new',
        userId: `${usr._id}`,
        startDate: '2020-01-01',
        endDate: '2020-01-02',
      });

      trip.save((err2, trp) => {
        chai
          .request(server)
          // eslint-disable-next-line no-underscore-dangle
          .delete(`/trip/${trp._id}`)
          .end((error, res) => {
            res.should.have.status(200);
            res.body.should.be.eql('Trip deleted.');
            done();
          });
      });
    });
  });

  it('/update/:id should update trip', done => {
    const user = new User({
      name: 'JoeMama',
      email: 'BEP@tonightisgonnabeagoodnight.ca',
      password: 'LetsgetitStarted',
    });
    user.save((err, usr) => {
      const trip = new Trip({
        tripname: 'new',
        userId: `${usr._id}`,
        startDate: '2020-01-01',
        endDate: '2020-01-02',
      });

      trip.save((err2, trp) => {
        chai
          .request(server)
          // eslint-disable-next-line no-underscore-dangle
          .post(`/trip/update/${trp._id}`)
          .send({tripname: 'My Humps'})
          .end((error, res) => {
            res.should.have.status(200);
            res.body.should.be.eql('Trip updated!');
            done();
          });
      });
    });
  });
});
