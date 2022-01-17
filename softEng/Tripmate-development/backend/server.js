const express = require('express');
const path = require('path');

const connectDB = require('./config/db');

const app = express();

connectDB();

// Init Midleware
app.use(express.json({extend: false}));

// serve static resources from server in production
app.use(express.static(path.join(__dirname, '../web-application/build')));
app.get('/', (req, res) => {
  res.sendFile(
    path.join(__dirname, '..', 'web-application', 'build', 'index.html'),
  );
});

// Define Routes

const authRouter = require('./routes/auth');

app.use('/auth', authRouter);

const userRouter = require('./routes/users');

app.use('/users', userRouter);

const tripRouter = require('./routes/trip');

app.use('/trip', tripRouter);

const budgetRouter = require('./routes/budget');

app.use('/budget', budgetRouter);

const hotelRouter = require('./routes/hotel');

app.use('/hotel', hotelRouter);

const todolistRouter = require('./routes/todolist');

app.use('/todolist', todolistRouter);

const flightRouter = require('./routes/flight');

app.use('/flight', flightRouter);

const ticketRouter = require('./routes/ticket');

app.use('/ticket', ticketRouter);

const eventRouter = require('./routes/event');

app.use('/event', eventRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT);

module.exports = app;
