const mongoose = require('mongoose');

const {Schema} = mongoose;

const ticketScheme = new Schema(
  {
    transportType: {
      type: String,
      required: true,
      trim: true,
    },
    start: {
      location: {
        type: String,
        required: true,
        trim: true,
      },
      date: {
        type: Date,
        required: true,
        trim: true,
      },
    },
    end: {
      location: {
        type: String,
        required: true,
        trim: true,
      },
      date: {
        type: Date,
        required: true,
        trim: true,
      },
    },
    confirmationNumber: {
      type: String,
      trim: true,
    },
    notes: {
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
const Ticket = mongoose.model('Ticket', ticketScheme);
module.exports = {Ticket};
