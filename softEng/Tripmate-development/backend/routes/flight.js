const router = require('express').Router();
const underscore = require('underscore');
const {XMLHttpRequest} = require('xmlhttprequest');
const {Flight} = require('../models/flight.model');
const {APIkey, APIurl, generateAPIRequestURL} = require('../api/flight/utils');

router.route('/trip/:tripId').get((req, res) => {
  Flight.find({tripId: req.params.tripId})
    .then(flights => res.json(flights))
    .catch(err => res.status(400).json(`Error: ${err}`));
});

router.route('/add_manual/:tripId').post((req, res) => {
  const newFlight = new Flight(
    underscore.extend(req.body, {tripId: req.params.tripId}),
  );

  newFlight
    .save()
    .then(() => res.json('Flight added!'))
    .catch(err => res.status(400).json(`Error: ${err}`));
});

router.route('/add_api/:tripId').post((req, res) => {
  const flight = req.body;
  const {tripId} = req.params;
  const apiUrl = generateAPIRequestURL(flight.number, flight.date);

  const data = null;

  const xhr = new XMLHttpRequest();
  xhr.withCredentials = true;

  xhr.addEventListener('readystatechange', function f() {
    if (this.readyState === this.DONE) {
      const obj = JSON.parse(this.responseText);

      if (obj.length > 0) {
        const newFlight = new Flight({
          tripId,
          departure: {
            airport: {
              iata: obj[0].departure.airport.iata,
              name: obj[0].departure.airport.name,
              shortName: obj[0].departure.airport.shortName,
              municipalityName: obj[0].departure.airport.municipalityName,
              countryCode: obj[0].departure.airport.countryCode,
            },
            scheduledTimeLocal: obj[0].departure.scheduledTimeLocal,
            actualTimeLocal: obj[0].departure.actualTimeLocal,
            gate: obj[0].departure.gate,
          },
          arrival: {
            airport: {
              iata: obj[0].arrival.airport.iata,
              name: obj[0].arrival.airport.name,
              shortName: obj[0].arrival.airport.shortName,
              municipalityName: obj[0].arrival.airport.municipalityName,
              countryCode: obj[0].arrival.airport.countryCode,
            },
            scheduledTimeLocal: obj[0].arrival.scheduledTimeLocal,
            actualTimeLocal: obj[0].arrival.actualTimeLocal,
            gate: obj[0].arrival.gate,
          },
          lastUpdatedUtc: obj[0].lastUpdatedUtc,
          number: obj[0].number,
          date: obj[0].departure.scheduledTimeLocal,
          status: obj[0].status,
          aircraftModel: obj[0].aircraft.model,
          airline: obj[0].airline.name,
        });

        newFlight
          .save()
          .then(() => res.json('Flight added!'))
          .catch(err => res.status(400).json(`Error: ${err}`));
      } else {
        res.status(404).send('Invalid flight information');
      }
    }
  });

  xhr.open('GET', apiUrl);
  xhr.setRequestHeader('x-rapidapi-host', APIurl);
  xhr.setRequestHeader('x-rapidapi-key', APIkey);

  xhr.send(data);
});

router.route('/:id').get((req, res) => {
  Flight.findById(req.params.id)
    .then(flights => res.json(flights))
    .catch(err => res.status(400).json(`Error: ${err}`));
});

router.route('/:id').delete((req, res) => {
  Flight.findByIdAndDelete(req.params.id)
    .then(() => res.json('Flight deleted.'))
    .catch(err => res.status(400).json(`Error: ${err}`));
});

router.route('/update/:id').post((req, res) => {
  Flight.findById(req.params.id)
    .then(flight => {
      if (req.body.departure) {
        flight.departure = req.body.departure;
      }
      if (req.body.arrival) {
        flight.arrival = req.body.arrival;
      }
      if (req.body.lastUpdatedUtc) {
        flight.lastUpdatedUtc = req.body.lastUpdatedUtc;
      }
      if (req.body.number) {
        flight.number = req.body.number;
      }
      if (req.body.status) {
        flight.status = req.body.status;
      }
      if (req.body.aircraftModel) {
        flight.aircraftModel = req.body.aircraftModel;
      }
      if (req.body.airline) {
        flight.airline = req.body.airline;
      }

      flight
        .save()
        .then(() => res.json('Flight updated!'))
        .catch(err => res.status(400).json(`Error: ${err}`));
    })
    .catch(err => res.status(400).json(`Error: ${err}`));
});

module.exports = router;
