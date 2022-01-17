import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import {fetchHotel} from '../../actions/hotel/fetchHotel';
import ConnectedHotelCard from './HotelCard';

export const Hotels = props => {
  useEffect(() => {
    props.dispatch(fetchHotel(props.tripId));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return !props.loading ? (
    <Box display="flex" flexWrap="wrap">
      {props.hotel.map((hotel, _id) => (
        <ConnectedHotelCard key={_id} tripId={props.tripId} hotel={hotel} />
      ))}
      {props.hotel.length < 1 ? (
        <Box display="flex" alignItems="center">
          <Typography variant="h6" component="h2">
            You currently do not have any hotels.
          </Typography>
        </Box>
      ) : null}
    </Box>
  ) : (
    <CircularProgress />
  );
};

Hotels.propTypes = {
  tripId: PropTypes.string.isRequired,
  dispatch: PropTypes.func,
  hotel: PropTypes.array,
  loading: PropTypes.bool,
};

const mapStateToProps = state => ({
  hotel: state.hotel.getHotels.hotel,
  loading: state.hotel.getHotels.loading,
  error: state.hotel.getHotels.error,
});

export default connect(mapStateToProps)(Hotels);
