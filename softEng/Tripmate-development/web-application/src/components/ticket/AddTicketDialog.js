import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import {connect} from 'react-redux';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import {
  FormControl,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
  TextField,
  Button,
  DialogActions,
} from '@material-ui/core';
import {createTicket} from '../../actions/ticket/createTicket';
import {fetchTicket} from '../../actions/ticket/fetchTicket';
import usePrevious from '../../hooks/usePrevious';

const useStyles = makeStyles({
  formControl: {
    minWidth: 120,
  },
});

export const AddTicketDialog = props => {
  const classes = useStyles();

  const [transportType, setTransportType] = useState(0);
  const [startLocation, setStartLocation] = useState(0);
  const [startDate, setStartDate] = useState(new Date());
  const [endLocation, setEndLocation] = useState(0);
  const [endDate, setEndDate] = useState(new Date());
  const [confirmationNumber, setConfirmationNumber] = useState(0);
  const [notes, setNotes] = useState(0);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const prevLoadingState = usePrevious(props.createTicketLoading);

  useEffect(() => {
    if (
      prevLoadingState &&
      !props.createTicketLoading &&
      props.createTicketError == null
    ) {
      props.dispatch(fetchTicket(props.tripId));
      props.handleClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.createTicketLoading]);

  const handleStartDateChange = date => {
    setStartDate(date);
  };

  const handleEndDateChange = date => {
    setEndDate(date);
  };

  const handleCreateNewTicket = () => {
    if (
      transportType.length === 0 ||
      startLocation.length === 0 ||
      startDate.length === 0 ||
      endLocation.length === 0 ||
      endDate.length === 0
    ) {
      setError(true);
      setErrorMessage('Please fill all required fields to add a new ticket.');
    } else {
      setError(false);
      setErrorMessage('');
      props.dispatch(
        createTicket(
          props.tripId,
          transportType,
          startLocation,
          startDate,
          endLocation,
          endDate,
          confirmationNumber,
          notes,
        ),
      );
    }
  };

  return (
    <div>
      <Dialog
        open={props.open}
        onClose={() => props.handleClose()}
        aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add Ticket</DialogTitle>
        <DialogContent>
          <FormControl className={classes.formControl}>
            <InputLabel id="ticket-transport-type-input">
              Transport Type
            </InputLabel>
            <Select
              labelId="ticket-transport-type-label"
              id="ticket-transport-type"
              value={transportType}
              onChange={e => setTransportType(e.target.value)}>
              <MenuItem value="Rail">Rail</MenuItem>
              <MenuItem value="Bus">Bus</MenuItem>
              <MenuItem value="Car Rental">Car Rental</MenuItem>
              <MenuItem value="Cruise">Cruise</MenuItem>
              <MenuItem value="Ferry">Ferry</MenuItem>
            </Select>
          </FormControl>
          <TextField
            id="ticket-start-location-input"
            label="Start location"
            fullWidth
            error={error}
            helperText={errorMessage}
            onChange={e => setStartLocation(e.target.value)}
          />
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              disableToolbar
              variant="inline"
              format="MM/dd/yyyy HH:mm ss"
              margin="normal"
              id="start-date"
              label="Start date"
              value={startDate}
              onChange={handleStartDateChange}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
            />
          </MuiPickersUtilsProvider>
          <TextField
            id="ticket-end-location-input"
            label="End location"
            fullWidth
            error={error}
            helperText={errorMessage}
            onChange={e => setEndLocation(e.target.value)}
          />
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              disableToolbar
              variant="inline"
              format="MM/dd/yyyy HH:mm ss"
              margin="normal"
              id="end-date"
              label="End date"
              value={endDate}
              onChange={handleEndDateChange}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
            />
          </MuiPickersUtilsProvider>
          <TextField
            id="ticket-confirmation-number-input"
            label="Confirmation number (optional)"
            fullWidth
            error={error}
            helperText={errorMessage}
            onChange={e => setConfirmationNumber(e.target.value)}
          />
          <TextField
            id="ticket-notes-input"
            label="Notes (optional)"
            fullWidth
            error={error}
            helperText={errorMessage}
            onChange={e => setNotes(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button
            disabled={props.createTicketLoading}
            onClick={() => props.handleClose()}
            color="secondary">
            Cancel
          </Button>
          <Button
            disabled={props.createTicketLoading}
            variant="contained"
            onClick={handleCreateNewTicket}
            color="primary">
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

AddTicketDialog.propTypes = {
  dispatch: PropTypes.func,
  open: PropTypes.bool.isRequired,
  handleClickOpen: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  tripId: PropTypes.string.isRequired,
  // from redux
  createTicketMessage: PropTypes.string,
  createTicketLoading: PropTypes.bool,
  createTicketError: PropTypes.shape({}),
};

const mapStateToProps = state => ({
  createTicketMessage: state.ticket.createTicket.createSuccessMessage,
  createTicketLoading: state.ticket.createTicket.createLoading,
  createTicketError: state.ticket.createTicket.createError,
});

export default connect(mapStateToProps)(AddTicketDialog);
