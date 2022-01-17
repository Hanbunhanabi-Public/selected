const {expect} = require('chai');
const {describe, it} = require('mocha');
const {Ticket} = require('../../models/ticket.model');

describe('Ticket Model', () => {
  it('should be invalid if ticket is empty', done => {
    const ticket = new Ticket();

    ticket.validate(err => {
      expect(err.errors.transportType).to.exist;
      done();
    });
  });

  it('should be invalid if ticket number is empty', done => {
    const ticket = new Ticket({transportType: ''});

    ticket.validate(err => {
      expect(err.errors.transportType).to.exist;
      done();
    });
  });

  it('should be valid if trasnport type is a string, start and end are filled', done => {
    const ticket = new Ticket({
      transportType: 'Bus',
      start: {location: 'Start', date: '2020-01-01'},
      end: {location: 'End', date: '2020-01-01'},
    });

    ticket.validate(err => {
      expect(err).to.be.null;
      expect(ticket.start.date).to.be.a('date');
      expect(ticket.end.date).to.be.a('date');
      done();
    });
  });
});
