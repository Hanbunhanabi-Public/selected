import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import {fetchFlight} from '../../actions/flight/fetchFlight';
import ConnectedFlightCard from './FlightCard';

export const Flight = props => {
  // on mount
  useEffect(() => {
    props.dispatch(fetchFlight(props.tripId));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return !props.loading ? (
    <Box display="flex" flexWrap="wrap">
      {props.flight.map((flight, _id) => (
        <ConnectedFlightCard tripId={props.tripId} key={_id} flight={flight} />
      ))}
      {props.flight.length < 1 ? (
        <Box display="flex" alignItems="center">
          <Typography variant="h6" component="h2">
            You currently do not have any flights.
          </Typography>
        </Box>
      ) : null}
    </Box>
  ) : (
    <CircularProgress />
  );
};

Flight.propTypes = {
  tripId: PropTypes.string.isRequired,
  dispatch: PropTypes.func,
  flight: PropTypes.array,
  loading: PropTypes.bool,
};

const mapStateToProps = state => ({
  flight: state.flight.getFlight.flight,
  loading: state.flight.getFlight.loading,
  error: state.flight.getFlight.error,
});

export default connect(mapStateToProps)(Flight);
