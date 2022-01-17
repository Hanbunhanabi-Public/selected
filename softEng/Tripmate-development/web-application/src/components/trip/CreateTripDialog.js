import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import {createTrip} from '../../actions/trip/createTrip';
import {fetchTrips} from '../../actions/trip/fetchTrips';
import usePrevious from '../../hooks/usePrevious';

export const CreateTripDialog = props => {
  const [tripName, setTripName] = useState('');
  const [tripDesc, setTripDesc] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [tripBudget, setTripBudget] = useState('');
  const prevCreateTripLoadingState = usePrevious(props.createTripLoading);

  useEffect(() => {
    if (
      prevCreateTripLoadingState &&
      !props.createTripLoading &&
      props.createTripError == null
    ) {
      props.dispatch(fetchTrips(props.userId));
      props.handleClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.createTripLoading]);

  const handleStartDateChange = date => {
    setStartDate(date);
  };

  const handleEndDateChange = date => {
    setEndDate(date);
  };

  const handleCreateTrip = () => {
    props.dispatch(
      createTrip(
        props.userId,
        tripName,
        tripDesc,
        startDate,
        endDate,
        tripBudget,
      ),
    );
  };

  return (
    <div>
      <Dialog
        open={props.open}
        onClose={() => props.handleClose()}
        aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Create Trip</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Start planning your next trip, but first why not give it a name!
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="tripName"
            label="Trip Name"
            type="string"
            fullWidth
            onChange={e => setTripName(e.target.value)}
          />
          <TextField
            multiline
            margin="dense"
            id="description"
            label="Trip Description"
            type="string"
            fullWidth
            onChange={e => setTripDesc(e.target.value)}
          />
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Box display="flex" justifyContent="space-evenly">
              <KeyboardDatePicker
                disableToolbar
                variant="inline"
                format="MM/dd/yyyy"
                margin="normal"
                id="date-picker-inline-start-date"
                label="Start date"
                value={startDate}
                onChange={handleStartDateChange}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
              <KeyboardDatePicker
                disableToolbar
                variant="inline"
                format="MM/dd/yyyy"
                margin="normal"
                id="date-picker-inline-end-date"
                label="End date"
                value={endDate}
                onChange={handleEndDateChange}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
            </Box>
          </MuiPickersUtilsProvider>
          <FormControl fullWidth>
            <InputLabel htmlFor="standard-adornment-amount">
              Trip budget
            </InputLabel>
            <Input
              id="standard-adornment-amount"
              value={tripBudget}
              onChange={e => setTripBudget(e.target.value)}
              startAdornment={
                <InputAdornment position="start">$</InputAdornment>
              }
            />
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => props.handleClose()} color="secondary">
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleCreateTrip}
            color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

CreateTripDialog.propTypes = {
  dispatch: PropTypes.func,
  open: PropTypes.bool.isRequired,
  handleClickOpen: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  // from redux
  createTripSuccessMessage: PropTypes.array,
  createTripLoading: PropTypes.bool,
  createTripError: PropTypes.shape({}),
  userId: PropTypes.string,
};

const mapStateToProps = state => ({
  createTripSuccessMessage: state.trip.createTrip.successMessage,
  createTripLoading: state.trip.createTrip.uploading,
  createTripError: state.trip.createTrip.error,
  userId: state.auth.user._id,
});

export default connect(mapStateToProps)(CreateTripDialog);
