const mongoose = require('mongoose');

const {Schema} = mongoose;

const expensesScheme = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 1,
    },
    amount: {
      type: Number,
      required: true,
      unique: false,
      min: 0,
    },
    isDone: {
      type: Boolean,
      required: true,
      unique: false,
    },
  },
  {
    timestamps: true,
  },
);

const budgetScheme = new Schema(
  {
    budget: {
      type: Number,
      required: true,
      unique: false,
      min: 0,
    },
    expenses: [expensesScheme],
    tripId: {
      type: mongoose.ObjectId,
      unique: false,
    },
  },

  {
    timestamps: true,
  },
);

const Budget = mongoose.model('Budget', budgetScheme);
const Expenses = mongoose.model('Expenses', expensesScheme);

module.exports = {
  Budget,
  Expenses,
};
