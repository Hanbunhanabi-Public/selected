const router = require('express').Router();
const underscore = require('underscore');
const {Hotel} = require('../models/hotel.model');
const apiRequest = require('../Business/HotelLogic');

router.route('/trip/:tripId').get((req, res) => {
  Hotel.find({tripId: req.params.tripId})
    .then(hotels => res.json(hotels))
    .catch(err => res.status(400).json(`Error: ${err}`));
});

router.route('/api').post(async (req, res) => {
  const params = req.body;

  const hotelList = await apiRequest(
    params.location,
    params.adults,
    params.rooms,
    params.nights,
    params.checkIn,
  );

  if (!Array.isArray(hotelList)) {
    res.status(404).send('Invalid hotel information');
  } else {
    res.json(hotelList);
  }
});

router.route('/add/:tripId').post((req, res) => {
  const newHotel = new Hotel(
    underscore.extend(req.body, {tripId: req.params.tripId}),
  );

  newHotel
    .save()
    .then(() => res.json('Hotel added!'))
    .catch(err => res.status(400).json(`Error: ${err}`));
});

router.route('/:id').get((req, res) => {
  Hotel.findById(req.params.id)
    .then(hotels => res.json(hotels))
    .catch(err => res.status(400).json(`Error: ${err}`));
});

router.route('/:id').delete((req, res) => {
  Hotel.findByIdAndDelete(req.params.id)
    .then(() => res.json('Hotel deleted.'))
    .catch(err => res.status(400).json(`Error: ${err}`));
});

router.route('/update/:id').post((req, res) => {
  Hotel.findById(req.params.id)
    .then(hotels => {
      if (req.body.name) {
        hotels.name = req.body.name;
      }
      if (req.body.price) {
        hotels.price = req.body.price;
      }
      if (req.body.location) {
        hotels.location = req.body.location;
      }
      if (req.body.checkIn) {
        hotels.checkIn = req.body.checkIn;
      }
      if (req.body.checkOut) {
        hotels.checkOut = req.body.checkOut;
      }
      if (req.body.numRating) {
        hotels.numRating = req.body.numRating;
      }
      if (req.body.rating) {
        hotels.rating = req.body.rating;
      }
      if (req.body.priceLevel) {
        hotels.priceLevel = req.body.priceLevel;
      }

      hotels
        .save()
        .then(() => res.json('Hotel updated!'))
        .catch(err => res.status(400).json(`Error: ${err}`));
    })
    .catch(err => res.status(400).json(`Error: ${err}`));
});

module.exports = router;
