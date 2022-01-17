const mongoose = require('mongoose');

const {Schema} = mongoose;

const eventScheme = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    start: {
      type: String,
    },
    end: {
      type: String,
    },
    location: {
      type: String,
      trim: true,
    },
    cost: {
      type: Number,
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
const Event = mongoose.model('Event', eventScheme);
module.exports = {Event};
