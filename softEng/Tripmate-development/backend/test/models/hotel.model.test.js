const {expect} = require('chai');
const {describe, it} = require('mocha');
const {Hotel} = require('../../models/hotel.model');

describe('Hotel Model', () => {
  it('should be invalid if hotel is empty', done => {
    const hotel = new Hotel();

    hotel.validate(err => {
      expect(err.errors.name).to.exist;
      expect(err.errors.location).to.exist;
      done();
    });
  });

  it('should be invalid if hotel name and location are empty', done => {
    const hotel = new Hotel({name: '', location: ''});

    hotel.validate(err => {
      expect(err.errors.name).to.exist;
      expect(err.errors.location).to.exist;
      done();
    });
  });

  it('should be valid if hotel name and location are filled', done => {
    const hotel = new Hotel({name: 'Test Hotel', location: 'Test Location'});

    hotel.validate(err => {
      expect(err).to.be.null;
      done();
    });
  });
});
