import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import {connect} from 'react-redux';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import DateFnsUtils from '@date-io/date-fns';
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import usePrevious from '../../hooks/usePrevious';
import {fetchEvent} from '../../actions/event/fetchEvent';
import {createEvent} from '../../actions/event/createEvent';

export const AddEventDialog = props => {
  const [eventTitle, setEventTitle] = useState('');
  const [eventDesc, setEventDesc] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [location, setLocation] = useState(new Date());
  const [cost, setCost] = useState('');
  const prevLoadingState = usePrevious(props.loading);

  useEffect(() => {
    if (prevLoadingState && !props.loading && props.error == null) {
      props.dispatch(fetchEvent(props.tripId));
      props.handleClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.loading]);

  const handleStartDateChange = date => {
    setStartDate(date);
  };

  const handleEndDateChange = date => {
    setEndDate(date);
  };

  const handleSave = () => {
    props.dispatch(
      createEvent(
        props.tripId,
        eventTitle,
        eventDesc,
        startDate,
        endDate,
        location,
        cost,
      ),
    );
  };

  return (
    <div>
      <Dialog
        open={props.open}
        onClose={() => props.handleClose()}
        aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add Event</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="eventTitle"
            label="Name"
            type="string"
            fullWidth
            onChange={e => setEventTitle(e.target.value)}
          />
          <TextField
            autoFocus
            margin="dense"
            id="eventDesc"
            label="Description"
            type="string"
            fullWidth
            onChange={e => setEventDesc(e.target.value)}
          />
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              disableToolbar
              variant="inline"
              format="MM/dd/yyyy"
              margin="normal"
              id="event-start-date"
              label="Start date"
              value={startDate}
              onChange={handleStartDateChange}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
            />
          </MuiPickersUtilsProvider>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              disableToolbar
              variant="inline"
              format="MM/dd/yyyy"
              margin="normal"
              id="event-end-date"
              label="End date"
              value={endDate}
              onChange={handleEndDateChange}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
            />
          </MuiPickersUtilsProvider>
          <TextField
            autoFocus
            margin="dense"
            id="eventLocation"
            label="Location"
            type="string"
            fullWidth
            onChange={e => setLocation(e.target.value)}
          />
          <FormControl fullWidth>
            <InputLabel htmlFor="standard-adornment-amount">Amount</InputLabel>
            <Input
              id="standard-adornment-amount"
              value={cost}
              onChange={e => setCost(e.target.value)}
              startAdornment={
                <InputAdornment position="start">$</InputAdornment>
              }
            />
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button
            disabled={props.loading}
            onClick={() => props.handleClose()}
            color="secondary">
            Cancel
          </Button>
          <Button
            disabled={props.loading}
            variant="contained"
            onClick={handleSave}
            color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

AddEventDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClickOpen: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  tripId: PropTypes.string.isRequired,
  // from redux
  dispatch: PropTypes.func,
  successMessage: PropTypes.string,
  loading: PropTypes.bool,
  error: PropTypes.shape({}),
};

const mapStateToProps = state => ({
  successMessage: state.event.createEvent.createSuccessMessage,
  loading: state.event.createEvent.createLoading,
  error: state.event.createEvent.createError,
});

export default connect(mapStateToProps)(AddEventDialog);
