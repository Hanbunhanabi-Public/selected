const {expect} = require('chai');
const {describe, it} = require('mocha');
const {Flight} = require('../../models/flight.model');

describe('Flight Model', () => {
  it('should be invalid if flight is empty', done => {
    const flight = new Flight();

    flight.validate(err => {
      expect(err.errors.number).to.exist;
      expect(err.errors.date).to.exist;
      done();
    });
  });

  it('should be invalid if flight number and date are empty', done => {
    const flight = new Flight({number: '', date: ''});

    flight.validate(err => {
      expect(err.errors.number).to.exist;
      expect(err.errors.date).to.exist;
      done();
    });
  });

  it('should be valid if flight number is a string and and flight number is a date', done => {
    const flight = new Flight({number: '123', date: '2020-01-01'});

    flight.validate(err => {
      expect(err).to.be.null;
      expect(flight.date).to.be.a('date');
      done();
    });
  });
});
