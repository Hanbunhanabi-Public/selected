process.env.NODE_ENV = 'test';

const {describe, it, beforeEach, afterEach} = require('mocha');
const mongoose = require('mongoose');

const chai = require('chai');
const chaiHttp = require('chai-http');
const {testURI} = require('../testURI');
const server = require('../../server');

// eslint-disable-next-line no-unused-vars
const should = chai.should();

const {Event} = require('../../models/event.model');

chai.use(chaiHttp);

describe('event routes', () => {
  beforeEach(async done => {
    mongoose.connect(testURI, {
      useNewUrlParser: true,
      useCreateIndex: true,
    });
    Event.remove({});
    done();
  });

  afterEach(async () => {
    await Event.deleteMany({});
    await mongoose.disconnect();
  });

  it('/ should get all events', done => {
    chai
      .request(server)
      .get('/event/trip/5e6aeefdb3256d55d6091d82')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.length.should.be.eql(0);
        done();
      });
  });

  it('/add should add a new event', done => {
    chai
      .request(server)
      .post('/event/add/5e6aeefdb3256d55d6091d82')
      .send({
        event: {
          title: 'Practice social distancing',
          description: 'Stay away from people.',
          start: '2020-03-15T18:26:26Z',
          end: '2020-03-15T20:00:00Z',
          location: 'Winnipeg',
          cost: '0.0',
        },
      })
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.be.eql('Event added!');
        done();
      });
  });

  it('/event/id should get an event by the given id', done => {
    const event = new Event({
      title: 'Watch a movie',
      start: '2020-03-15T18:00:00Z',
      end: '2020-03-15T20:00:00Z',
      location: 'St. Vital theatre',
      cost: 15.0,
    });
    event.save((err, evnt) => {
      chai
        .request(server)
        // eslint-disable-next-line no-underscore-dangle
        .get(`/event/${evnt._id}`)
        .end((error, res) => {
          res.should.have.status(200);
          res.body.should.have.property('title');
          done();
        });
    });
  });

  it('DELETE /event/id should delete the event matching id', done => {
    const event = new Event({
      title: 'Watch a movie',
      start: '2020-03-15T18:00:00Z',
      end: '2020-03-15T20:00:00Z',
      location: 'St. Vital theatre',
      cost: 15.0,
    });
    event.save((err, evnt) => {
      chai
        .request(server)
        // eslint-disable-next-line no-underscore-dangle
        .delete(`/event/${evnt._id}`)
        .end((error, res) => {
          res.should.have.status(200);
          res.body.should.be.eql('Event deleted.');
          done();
        });
    });
  });

  it('/event/update/id should update event', done => {
    const event = new Event({
      title: 'Watch a movie',
      description: 'Go out to a movie theatre',
      start: '2020-03-15T18:00:00Z',
      end: '2020-03-15T20:00:00Z',
      location: 'St. Vital theatre',
      cost: 15.0,
    });
    event.save((err, evnt) => {
      chai
        .request(server)
        // eslint-disable-next-line no-underscore-dangle
        .post(`/event/update/${evnt._id}`)
        .send({
          title: 'Watch a tv show instead',
          description: 'Be socially distant',
          start: 'Whenever',
          end: 'Any time',
          location: 'Basement',
          cost: 0.0,
        })
        .end((error, res) => {
          res.should.have.status(200);
          res.body.should.be.eql('Event updated!');
          done();
        });
    });
  });
});
