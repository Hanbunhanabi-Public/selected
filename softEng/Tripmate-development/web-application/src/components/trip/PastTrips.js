import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import {makeStyles} from '@material-ui/core/styles';
import {CircularProgress} from '@material-ui/core';
import CardTravelIcon from '@material-ui/icons/CardTravel';
import Typography from '@material-ui/core/Typography';
import {TripCard} from './TripCard';
import {fetchTrips} from '../../actions/trip/fetchTrips';
import compareDates from '../../utils/compareDates';

const useStyles = makeStyles({
  grid: {
    marginBottom: 20,
  },
});

export const PastTrips = props => {
  const classes = useStyles();
  const [pastTrips, setPastTrips] = useState([]);

  // on mount
  useEffect(() => {
    props.dispatch(fetchTrips(props.userId));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!props.loading) {
      setPastTrips(
        props.trips.filter(
          trip => compareDates(trip.endDate, new Date()) === -1,
        ),
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.loading]);

  return (
    <div>
      <Grid className={classes.grid} justify="space-between" container>
        <Grid item>
          <h1>Past Trips</h1>
        </Grid>
      </Grid>
      <Box display="flex" flexWrap="wrap">
        {!props.loading ? (
          pastTrips.map(trip => (
            <TripCard
              key={trip._id}
              trip={trip}
              onViewTripClick={() => {}}
              canView={false}
            />
          ))
        ) : (
          <CircularProgress />
        )}
        {pastTrips.length < 1 ? (
          <Box display="flex" alignItems="center">
            <CardTravelIcon />
            <Typography variant="h6" component="h2">
              You have no past trips.
            </Typography>
          </Box>
        ) : null}
      </Box>
    </div>
  );
};

PastTrips.propTypes = {
  dispatch: PropTypes.func,
  // from redux
  userId: PropTypes.string,
  trips: PropTypes.array,
  loading: PropTypes.bool,
  error: PropTypes.shape({}),
};

const mapStateToProps = state => ({
  userId: state.auth.user._id,
  trips: state.trip.getTrips.trips,
  loading: state.trip.getTrips.loading,
  error: state.trip.getTrips.error,
});

export default connect(mapStateToProps)(PastTrips);
