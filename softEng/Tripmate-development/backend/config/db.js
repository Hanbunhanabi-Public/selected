const mongoose = require('mongoose');
const {testURI} = require('../test/testURI');
// Where we are going to store environment variables
require('dotenv').config();

const uri =
  process.env.NODE_ENV === 'test' ? testURI : process.env.ATLAS_URI_DEV;

const connectDB = async () => {
  try {
    await mongoose.set('useUnifiedTopology', true);
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
  } catch (err) {
    process.exit(1);
  }
};

module.exports = connectDB;
