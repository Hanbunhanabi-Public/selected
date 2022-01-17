import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import {makeStyles} from '@material-ui/core/styles';
import CardTravelIcon from '@material-ui/icons/CardTravel';
import Typography from '@material-ui/core/Typography';
import {CircularProgress} from '@material-ui/core';
import {TripCard} from './TripCard';
import {Trip} from './Trip';
import ConnectedCreateTripDialog from './CreateTripDialog';
import {fetchTrips} from '../../actions/trip/fetchTrips';
import compareDates from '../../utils/compareDates';

const useStyles = makeStyles({
  grid: {
    marginBottom: 20,
  },
});

export const Trips = props => {
  const classes = useStyles();
  const [upcomingTrips, setUpcomingTrips] = useState([]);
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [isViewingTrip, setIsViewingTrip] = useState(false);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  // on mount
  useEffect(() => {
    props.dispatch(fetchTrips(props.userId));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!props.loading) {
      setUpcomingTrips(
        props.trips.filter(
          trip => compareDates(trip.endDate, new Date()) === 1,
        ),
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.loading]);

  const handleViewTripClick = trip => {
    setSelectedTrip(trip);
    setIsViewingTrip(true);
  };

  const handleBackButtonClick = () => {
    setIsViewingTrip(false);
  };

  return isViewingTrip ? (
    <Trip trip={selectedTrip} onBackButtonClick={handleBackButtonClick} />
  ) : (
    <div>
      <Grid className={classes.grid} justify="space-between" container>
        <Grid item>
          <h1>Your Trips</h1>
        </Grid>
        <Grid item>
          <Button
            onClick={() => setIsCreateDialogOpen(true)}
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}>
            Create Trip
          </Button>
        </Grid>
      </Grid>
      <Box display="flex" flexWrap="wrap">
        {!props.loading ? (
          upcomingTrips.map(trip => (
            <TripCard
              key={trip._id}
              trip={trip}
              onViewTripClick={handleViewTripClick}
              canView={true}
            />
          ))
        ) : (
          <CircularProgress />
        )}
        {upcomingTrips.length < 1 ? (
          <Box display="flex" alignItems="center">
            <CardTravelIcon />
            <Typography variant="h6" component="h2">
              You currently do not have any trips. Let&apos;s get started!
            </Typography>
          </Box>
        ) : null}
      </Box>
      <ConnectedCreateTripDialog
        open={isCreateDialogOpen}
        handleClickOpen={() => setIsCreateDialogOpen(true)}
        handleClose={() => setIsCreateDialogOpen(false)}
      />
    </div>
  );
};

Trips.propTypes = {
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

export default connect(mapStateToProps)(Trips);
