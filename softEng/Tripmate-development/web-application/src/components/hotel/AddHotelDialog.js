import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import CircularProgress from '@material-ui/core/CircularProgress';
import DialogTitle from '@material-ui/core/DialogTitle';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import {connect} from 'react-redux';
import Box from '@material-ui/core/Box';
import {fetchHotelAPI} from '../../actions/hotel/fetchHotelAPI';
import {fetchHotel} from '../../actions/hotel/fetchHotel';
import {createHotel} from '../../actions/hotel/createHotel';
import {HotelSelector} from './HotelSelector';
import usePrevious from '../../hooks/usePrevious';

export const AddHotelDialog = props => {
  const [location, setLocation] = useState('');
  const [adults, setAdults] = useState('');
  const [rooms, setRooms] = useState('');
  const [nights, setNights] = useState('');
  const [checkIn, setCheckin] = useState(new Date());
  const prevLoadingState = usePrevious(props.createLoading);

  useEffect(() => {
    if (prevLoadingState && !props.createLoading && props.createError == null) {
      props.dispatch(fetchHotel(props.tripId));
      props.handleClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.createLoading]);

  const findHotels = () => {
    props.dispatch(fetchHotelAPI(location, adults, rooms, nights, checkIn));
  };

  const handleDateChange = date => {
    setCheckin(date);
  };

  const handleCreateHotel = selectedHotel => {
    if (selectedHotel) {
      props.dispatch(
        createHotel(
          props.tripId,
          selectedHotel.name,
          selectedHotel.price,
          selectedHotel.location,
          selectedHotel.checkIn,
          selectedHotel.checkOut,
          selectedHotel.numRating,
          selectedHotel.rating,
          selectedHotel.priceLevel,
        ),
      );
    }
  };

  return (
    <div>
      <Dialog
        maxWidth="lg"
        open={props.open}
        onClose={() => props.handleClose()}
        aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add Hotel</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="hotelLocation"
            label="Location"
            type="string"
            fullWidth
            onChange={e => setLocation(e.target.value)}
          />
          <TextField
            margin="dense"
            id="hotel-adults"
            label="Number of Adults"
            type="number"
            fullWidth
            onChange={e => setAdults(e.target.value)}
          />
          <TextField
            margin="dense"
            id="hotel-rooms"
            label="Number of Rooms"
            type="number"
            fullWidth
            onChange={e => setRooms(e.target.value)}
          />
          <TextField
            margin="dense"
            id="hotel-nights"
            label="Number of Nights"
            type="number"
            fullWidth
            onChange={e => setNights(e.target.value)}
          />
          <Box
            display="flex"
            alignItems="flex-end"
            justifyContent="space-between">
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                disableToolbar
                variant="inline"
                format="MM/dd/yyyy"
                margin="normal"
                id="date-picker-inline-start-date"
                label="Start date"
                value={checkIn}
                onChange={handleDateChange}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
            </MuiPickersUtilsProvider>
            <Button onClick={findHotels} variant="contained" color="primary">
              Find hotels
            </Button>
          </Box>
          {!props.apiHotelsLoading &&
          props.apiHotels &&
          props.apiHotels.length ? (
            <HotelSelector
              createHotel={handleCreateHotel}
              hotel={props.apiHotels}
            />
          ) : null}
          {props.apiHotelsLoading ? <CircularProgress /> : null}
        </DialogContent>
        <DialogActions>
          <Button
            disabled={props.apiHotelsLoading}
            onClick={() => props.handleClose()}
            color="secondary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

AddHotelDialog.propTypes = {
  dispatch: PropTypes.func,
  open: PropTypes.bool.isRequired,
  handleClickOpen: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  tripId: PropTypes.string.isRequired,
  // from redux
  apiHotels: PropTypes.array,
  apiHotelsLoading: PropTypes.bool,
  apiHotelsError: PropTypes.shape({}),
  successMessage: PropTypes.array,
  createLoading: PropTypes.bool,
  createError: PropTypes.shape({}),
};

const mapStateToProps = state => ({
  apiHotels: state.hotel.getHotelsAPI.hotelAPI,
  apiHotelsLoading: state.hotel.getHotelsAPI.loadingAPI,
  apiHotelsError: state.hotel.getHotelsAPI.errorAPI,
  successMessage: state.hotel.createHotel.successMessage,
  createLoading: state.hotel.createHotel.createLoading,
  createError: state.hotel.createHotel.createError,
});

export default connect(mapStateToProps)(AddHotelDialog);
