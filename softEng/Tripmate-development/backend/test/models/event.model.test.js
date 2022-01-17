const {expect} = require('chai');
const {describe, it} = require('mocha');
const {Event} = require('../../models/event.model');

describe('Event model', () => {
  it('should be invalid if event is empty', done => {
    const event = new Event();

    event.validate(err => {
      expect(err.errors.title).to.exist;
      done();
    });
  });

  it("should be invalid if 'title' is empty", done => {
    const event = new Event({title: ''});

    event.validate(err => {
      expect(err.errors.title).to.exist;
      done();
    });
  });

  it('should be valid if all fields are filled', done => {
    const event = new Event({
      title: 'This is an event title',
      creator: 'Harry Potter',
      start: '2020-03-15T18:00:00Z',
      end: '2020-03-15T20:00:00Z',
      location: 'Hogwarts',
      cost: 100.0,
    });

    event.validate(err => {
      expect(err).to.be.null;
      done();
    });
  });
});
