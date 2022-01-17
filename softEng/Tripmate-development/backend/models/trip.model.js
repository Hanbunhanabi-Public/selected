const mongoose = require('mongoose');

const {Schema} = mongoose;

const tripSchema = new Schema(
  {
    userId: {
      type: mongoose.ObjectId,
      unique: false,
      trim: true,
    },
    tripname: {
      type: String,
      required: true,
      trim: true,
      unique: false,
      minlength: 1,
    },
    description: {
      type: String,
      unique: false,
      trim: true,
    },
    startDate: {
      type: Date,
      min: '1940-01-01',
    },
    endDate: {
      type: Date,
      min: '1940-01-01',
    },
  },
  {
    timestamps: true,
  },
);
const Trip = mongoose.model('Trip', tripSchema);
module.exports = {Trip};
