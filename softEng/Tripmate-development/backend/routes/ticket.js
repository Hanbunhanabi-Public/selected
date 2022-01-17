const router = require('express').Router();
const underscore = require('underscore');
const {Ticket} = require('../models/ticket.model');

router.route('/trip/:tripId').get((req, res) => {
  Ticket.find({tripId: req.params.tripId})
    .then(tickets => res.json(tickets))
    .catch(err => res.status(400).json(`Error: ${err}`));
});

router.route('/add/:tripId').post((req, res) => {
  const newTicket = new Ticket(
    underscore.extend(req.body, {tripId: req.params.tripId}),
  );

  newTicket
    .save()
    .then(() => res.json('Ticket added!'))
    .catch(err => res.status(400).json(`Error: ${err}`));
});

router.route('/:id').get((req, res) => {
  Ticket.findById(req.params.id)
    .then(tickets => res.json(tickets))
    .catch(err => res.status(400).json(`Error: ${err}`));
});

router.route('/:id').delete((req, res) => {
  Ticket.findByIdAndDelete(req.params.id)
    .then(() => res.json('Ticket deleted.'))
    .catch(err => res.status(400).json(`Error: ${err}`));
});

router.route('/update/:id').post((req, res) => {
  Ticket.findById(req.params.id)
    .then(ticket => {
      if (req.body.transportType) {
        ticket.transportType = req.body.transportType;
      }
      if (req.body.start) {
        ticket.start = req.body.start;
      }
      if (req.body.end) {
        ticket.end = req.body.end;
      }
      if (req.body.confirmationNumber) {
        ticket.confirmationNumber = req.body.confirmationNumber;
      }
      if (req.body.notes) {
        ticket.notes = req.body.notes;
      }

      ticket
        .save()
        .then(() => res.json('Ticket updated!'))
        .catch(err => res.status(400).json(`Error: ${err}`));
    })
    .catch(err => res.status(400).json(`Error: ${err}`));
});

module.exports = router;
