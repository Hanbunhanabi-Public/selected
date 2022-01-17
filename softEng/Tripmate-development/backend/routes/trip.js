const router = require('express').Router({mergeParams: true});
const underscore = require('underscore');
const {Trip} = require('../models/trip.model');
const {User} = require('../models/user.model');
const {Budget} = require('../models/budget.model');
const {Flight} = require('../models/flight.model');
const {Hotel} = require('../models/hotel.model');
const {Ticket} = require('../models/ticket.model');
const {ToDoList} = require('../models/todolist.model');
const {Event} = require('../models/event.model');

router.route('/add/:userId').post((req, res) => {
  const newTrip = new Trip(
    underscore.extend(req.body, {userId: req.params.userId}),
  );
  if (req.params.userId) {
    newTrip
      .save()
      .then(savedNewTrip => {
        const {budget} = req.body;
        if (budget) {
          const newBudget = new Budget({budget, tripId: savedNewTrip._id});
          newBudget.save().catch(err => res.status(400).json(`Error: ${err}`));
        } else {
          const defaultBudget = new Budget({
            budget: 0,
            tripId: savedNewTrip._id,
          });
          defaultBudget
            .save()
            .catch(err => res.status(400).json(`Error: ${err}`));
        }

        User.findByIdAndUpdate(
          savedNewTrip.userId,
          {$push: {trips: savedNewTrip._id}},
          // eslint-disable-next-line no-unused-vars
          (userUpdateError, _userUpdated) => {
            if (userUpdateError) {
              res.status(400).json(`Error: ${userUpdateError}`);
            } else {
              res.status(201).json('Trip added.');
            }
          },
        );
      })
      .catch(err => res.status(400).json(`Error: ${err}`));
  } else {
    res.status(400).json(`Error: UserId Required`);
  }
});

router.route('/user/:userId').get((req, res) => {
  Trip.find({userId: req.params.userId})
    .then(trips => res.json(trips))
    .catch(err => res.status(400).json(`Error: ${err}`));
});

router.route('/:id').get((req, res) => {
  Trip.findById(req.params.id)
    .then(trip => res.json(trip))
    .catch(err => res.status(400).json(`Error: ${err}`));
});

router.route('/:id').delete((req, res) => {
  Trip.findByIdAndDelete(req.params.id, (deletedTripError, deletedTrip) => {
    if (deletedTripError) {
      res.status(400).json(`Error: ${deletedTripError}`);
    } else if (deletedTrip) {
      Budget.deleteMany({tripId: deletedTrip._id}).exec();
      Flight.deleteMany({tripId: deletedTrip._id}).exec();
      Hotel.deleteMany({tripId: deletedTrip._id}).exec();
      Ticket.deleteMany({tripId: deletedTrip._id}).exec();
      ToDoList.deleteMany({tripId: deletedTrip._id}).exec();
      Event.deleteMany({tripId: deletedTrip._id}).exec();
      User.updateOne(
        {_id: deletedTrip.userId},
        {$pull: {trips: [deletedTrip._id]}},
        // eslint-disable-next-line no-unused-vars
        (userErr, _userRes) => {
          if (userErr) {
            res.status(400).json(`Error: ${userErr}`);
          } else {
            res.status(200).json('Trip deleted.');
          }
        },
      );
    } else {
      res.status(400).json("Error: TripId doesn't exist.");
    }
  });
});

router.route('/update/:id').post((req, res) => {
  Trip.findById(req.params.id)
    .then(trip => {
      if (req.body.tripname) {
        trip.tripname = req.body.tripname;
      }
      if (req.body.startDate) {
        trip.startDate = req.body.startDate;
      }
      if (req.body.endDate) {
        trip.endDate = req.body.endDate;
      }
      if (req.body.description) {
        trip.description = req.body.description;
      }

      trip
        .save()
        .then(() => res.json('Trip updated!'))
        .catch(err => res.status(400).json(`Error: ${err}`));
    })
    .catch(err => res.status(400).json(`Error: ${err}`));
});

module.exports = router;
