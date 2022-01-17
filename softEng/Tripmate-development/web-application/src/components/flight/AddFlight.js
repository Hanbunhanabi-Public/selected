import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {
  ListItem,
  Box,
  TextField,
  Collapse,
  Button,
  makeStyles,
} from '@material-ui/core';
import {ExpandLess, ExpandMore} from '@material-ui/icons';
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import Typography from '@material-ui/core/Typography';
import {
  createFlightManually,
  createFlightAutomatically,
} from '../../actions/flight/createFlight';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  listItemHeader: {
    padding: 0,
  },
  listItemText: {
    paddingLeft: theme.spacing(4),
    fontSize: 12,
  },
  listItemSecondary: {
    paddingTop: theme.spacing(0.1),
  },
  box: {
    marginBottom: 20,
  },
}));

export const AddFlight = props => {
  const classes = useStyles();

  const [departureCity, setDepartureCity] = useState(0);
  const [departureCountry, setDepartureCountry] = useState(0);
  const [departureAirport, setDepartureAirport] = useState(0);
  const [departureGate, setDepartureGate] = useState(0);
  const [departureTime, setDepartureTime] = useState(new Date());
  const [arrivalCity, setArrivalCity] = useState(0);
  const [arrivalCountry, setArrivalCountry] = useState(0);
  const [arrivalAirport, setArrivalAirport] = useState(0);
  const [arrivalGate, setArrivalGate] = useState(0);
  const [arrivalTime, setArrivalTime] = useState(new Date());
  const [flightNumber, setFlightNumber] = useState(0);
  const [flightDate, setFlightDate] = useState(new Date());
  const [airline, setAirline] = useState(0);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [openManual, setOpenManual] = useState(false);
  const [openAuto, setOpenAuto] = useState(true);

  const handleDateChange = date => {
    setFlightDate(date);
  };

  const handleDepartureDateChange = date => {
    setDepartureTime(date);
  };

  const handleArrivalDateChange = date => {
    setArrivalTime(date);
  };

  const handleCreateNewFlightManually = () => {
    if (
      departureCity.length === 0 ||
      departureCountry.length === 0 ||
      departureAirport.length === 0 ||
      departureGate.length === 0 ||
      departureTime.length === 0 ||
      arrivalCity.length === 0 ||
      arrivalCountry.length === 0 ||
      arrivalAirport.length === 0 ||
      arrivalGate.length === 0 ||
      arrivalTime.length === 0 ||
      flightNumber.length === 0 ||
      airline.length === 0
    ) {
      setError(true);
      setErrorMessage('Please fill all fields to add a new flight.');
    } else {
      setError(false);
      setErrorMessage('');
      props.dispatch(
        createFlightManually(
          props.tripId,
          departureCity,
          departureCountry,
          departureAirport,
          departureGate,
          departureTime,
          arrivalCity,
          arrivalCountry,
          arrivalAirport,
          arrivalGate,
          arrivalTime,
          flightNumber,
          flightDate,
          airline,
        ),
      );
    }
  };

  const handleCreateNewFlightAutomatically = () => {
    if (setFlightNumber.length === 0) {
      setError(true);
      setErrorMessage('Fligth number cannot be empty.');
    } else if (setFlightDate.length === 0) {
      setError(true);
      setErrorMessage('Fligth date cannot be empty.');
    } else {
      setError(false);
      setErrorMessage('');
      props.dispatch(
        createFlightAutomatically(props.tripId, flightNumber, flightDate),
      );
    }
  };

  return (
    <div>
      <div>
        <ListItem
          button
          className={classes.listItemHeader}
          onClick={() => setOpenAuto(!openAuto)}>
          <h3>Add Flight Automatically</h3>
          {openAuto ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={openAuto} timeout="auto" unmountOnExit>
          <TextField
            autoFocus
            margin="dense"
            id="flightNumber"
            label="Flight Number"
            type="string"
            fullWidth
            onChange={e => setFlightNumber(e.target.value)}
          />
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              disableToolbar
              variant="inline"
              format="MM/dd/yyyy"
              margin="normal"
              id="date-picker-inline-flight-date"
              label="Flight date"
              value={flightDate}
              onChange={handleDateChange}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
            />
          </MuiPickersUtilsProvider>
          <div>
            <Button
              variant="contained"
              color="primary"
              size="medium"
              onClick={() => handleCreateNewFlightAutomatically()}>
              Create Flight
            </Button>
          </div>
        </Collapse>
      </div>

      <div>
        <ListItem
          button
          className={classes.listItemHeader}
          onClick={() => setOpenManual(!openManual)}>
          <h3>Add Flight Manually</h3>
          {openManual ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={openManual} timeout="auto" unmountOnExit>
          <Box className={classes.box}>
            <TextField
              id="flight-number-input"
              label="Enter flight number"
              error={error}
              helperText={errorMessage}
              fullWidth
              onChange={e => setFlightNumber(e.target.value)}
            />
            <TextField
              id="flight-airline-input"
              label="Enter airline"
              error={error}
              fullWidth
              helperText={errorMessage}
              onChange={e => setAirline(e.target.value)}
            />
          </Box>
          <Box className={classes.box}>
            <Typography variant="h6" component="h2">
              Departure
            </Typography>
            <TextField
              id="flight-departure-city-input"
              label="Enter departure city"
              error={error}
              fullWidth
              helperText={errorMessage}
              onChange={e => setDepartureCity(e.target.value)}
            />
            <TextField
              id="flight-departure-country-input"
              label="Enter departure country"
              error={error}
              fullWidth
              helperText={errorMessage}
              onChange={e => setDepartureCountry(e.target.value)}
            />
            <TextField
              id="flight-departure-airport-input"
              label="Enter departure airport"
              error={error}
              fullWidth
              helperText={errorMessage}
              onChange={e => setDepartureAirport(e.target.value)}
            />
            <TextField
              id="flight-departure-gate-input"
              label="Enter departure gate"
              error={error}
              fullWidth
              helperText={errorMessage}
              onChange={e => setDepartureGate(e.target.value)}
            />
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                disableToolbar
                variant="inline"
                format="MM/dd/yyyy HH:mm ss"
                margin="normal"
                id="auto-departure"
                label="Departure time"
                value={departureTime}
                onChange={handleDepartureDateChange}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
            </MuiPickersUtilsProvider>
          </Box>
          <Box className={classes.box}>
            <Typography variant="h6" component="h2">
              Arrival
            </Typography>
            <TextField
              id="flight-arrival-city-input"
              label="Enter arrival city"
              error={error}
              fullWidth
              helperText={errorMessage}
              onChange={e => setArrivalCity(e.target.value)}
            />
            <TextField
              id="flight-arrival-country-input"
              label="Enter arrival country"
              error={error}
              fullWidth
              helperText={errorMessage}
              onChange={e => setArrivalCountry(e.target.value)}
            />
            <TextField
              id="flight-arrival-airport-input"
              label="Enter arrival airport"
              error={error}
              fullWidth
              helperText={errorMessage}
              onChange={e => setArrivalAirport(e.target.value)}
            />
            <TextField
              id="flight-arrival-gate-input"
              label="Enter arrival gate"
              error={error}
              fullWidth
              helperText={errorMessage}
              onChange={e => setArrivalGate(e.target.value)}
            />
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                disableToolbar
                variant="inline"
                format="MM/dd/yyyy HH:mm ss"
                margin="normal"
                id="manual-departure"
                label="Departure time"
                value={arrivalTime}
                onChange={handleArrivalDateChange}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
            </MuiPickersUtilsProvider>
            <div>
              <Button
                variant="contained"
                color="primary"
                size="medium"
                onClick={() => handleCreateNewFlightManually()}>
                Create Flight
              </Button>
            </div>
          </Box>
        </Collapse>
      </div>
    </div>
  );
};

AddFlight.propTypes = {
  tripId: PropTypes.string.isRequired,
  closeAddFlightDialog: PropTypes.func.isRequired,
  dispatch: PropTypes.func,
  createFlightMessage: PropTypes.string,
  createFlightLoading: PropTypes.bool,
  createFlightError: PropTypes.shape({}),
};

const mapStateToProps = state => ({
  createFlightMessage: state.flight.createFlight.createSuccessMessage,
  createFlightLoading: state.flight.createFlight.createLoading,
  createFlightError: state.flight.createFlight.createError,
});

export default connect(mapStateToProps)(AddFlight);
