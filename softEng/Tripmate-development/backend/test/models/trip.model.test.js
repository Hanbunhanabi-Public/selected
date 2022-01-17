const {expect} = require('chai');
const {describe, it} = require('mocha');
const {Trip} = require('../../models/trip.model');

describe('Trip Model', () => {
  it('should be invalid if trip is empty', done => {
    const trip = new Trip();

    trip.validate(err => {
      expect(err.errors.tripname).to.exist;
      done();
    });
  });

  it('should be invalid if trip tripname is empty and dates are before 1940', done => {
    const trip = new Trip({
      tripname: '',
      startDate: '1939-01-01',
      endDate: '1939-01-01',
    });

    trip.validate(err => {
      expect(err.errors.tripname).to.exist;
      expect(err.errors.startDate).to.exist;
      expect(err.errors.endDate).to.exist;
      done();
    });
  });

  it('should be valid if trip number is a string and and trip number is a date', done => {
    const trip = new Trip({
      tripname: 'Trip',
      startDate: '1940-01-01',
      endDate: '1940-01-01',
    });

    trip.validate(err => {
      expect(err).to.be.null;
      expect(trip.startDate).to.be.a('date');
      expect(trip.endDate).to.be.a('date');
      done();
    });
  });
});
