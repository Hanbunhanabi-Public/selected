const mongoose = require('mongoose');

const {Schema} = mongoose;

const hotelScheme = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: String,
    },
    location: {
      type: String,
      required: true,
    },
    checkIn: {
      type: Date,
    },
    checkOut: {
      type: Date,
    },
    numRating: {
      type: String,
    },
    rating: {
      type: String,
    },
    priceLevel: {
      type: String,
    },
    tripId: {
      type: mongoose.ObjectId,
      unique: false,
    },
  },
  {
    timestamps: true,
  },
);

const Hotel = mongoose.model('Hotel', hotelScheme);
module.exports = {Hotel};
