import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import {IconButton, Box} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import {deleteFlight} from '../../actions/flight/deleteFlight';
import {fetchFlight} from '../../actions/flight/fetchFlight';
import usePrevious from '../../hooks/usePrevious';

const useStyles = makeStyles({
  root: {
    minWidth: 250,
    marginRight: 20,
    marginBottom: 20,
  },
});

export const FlightCard = props => {
  const classes = useStyles();
  const prevLoadingState = usePrevious(props.deleteLoading);

  useEffect(() => {
    if (prevLoadingState && !props.deleteLoading && props.deleteError == null) {
      props.dispatch(fetchFlight(props.tripId));
    }
  });

  const handleDeleteFlight = () => {
    props.dispatch(deleteFlight(props.flight._id));
  };

  return (
    <Card className={classes.root}>
      <CardContent>
        <Box>
          <Typography variant="subtitle1" component="h2" align="center">
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between">
              {`${props.flight.number} - ${props.flight.airline}`}
              <IconButton color="primary" onClick={() => handleDeleteFlight()}>
                <DeleteIcon fontSize="small" />
              </IconButton>
            </Box>
          </Typography>
        </Box>
        <Divider />
        <Box>
          <Typography variant="subtitle1" component="h2">
            Flight Status
          </Typography>
          <Typography variant="body2" color="textSecondary" gutterBottom>
            {props.flight.status}
          </Typography>
        </Box>
        <Divider />
        <Box>
          <Typography variant="subtitle1" component="h2">
            Departure
          </Typography>
          {props.flight.departure.airport.name ? (
            <Typography variant="body2" color="textSecondary" gutterBottom>
              {`Airport: ${props.flight.departure.airport.name}`}
            </Typography>
          ) : null}
          {props.flight.departure.airport.municipalityName ? (
            <Typography variant="body2" color="textSecondary" gutterBottom>
              {`Location: ${props.flight.departure.airport.municipalityName} - ${props.flight.departure.airport.countryCode}`}
            </Typography>
          ) : null}
          {props.flight.departure.gate ? (
            <Typography variant="body2" color="textSecondary" gutterBottom>
              {`Gate: ${props.flight.departure.gate}`}
            </Typography>
          ) : null}
          {props.flight.departure.scheduledTimeLocal ? (
            <Typography variant="body2" color="textSecondary" gutterBottom>
              {`Scheduled Time: ${props.flight.departure.scheduledTimeLocal}`}
            </Typography>
          ) : null}
          {props.flight.departure.actualTimeLocal ? (
            <Typography variant="body2" color="textSecondary" gutterBottom>
              {`Actual Time: ${props.flight.departure.actualTimeLocal}`}
            </Typography>
          ) : null}
        </Box>
        <Divider />
        <Box>
          <Typography variant="subtitle1" component="h2">
            Arrival
          </Typography>
          {props.flight.arrival.airport.name ? (
            <Typography variant="body2" color="textSecondary" gutterBottom>
              {`Airport: ${props.flight.arrival.airport.name}`}
            </Typography>
          ) : null}
          {props.flight.arrival.airport.municipalityName ? (
            <Typography variant="body2" color="textSecondary" gutterBottom>
              {`Location: ${props.flight.arrival.airport.municipalityName} - ${props.flight.arrival.airport.countryCode}`}
            </Typography>
          ) : null}
          {props.flight.arrival.gate ? (
            <Typography variant="body2" color="textSecondary" gutterBottom>
              {`Gate: ${props.flight.arrival.gate}`}
            </Typography>
          ) : null}
          {props.flight.arrival.scheduledTimeLocal ? (
            <Typography variant="body2" color="textSecondary" gutterBottom>
              {`Scheduled Time: ${props.flight.arrival.scheduledTimeLocal}`}
            </Typography>
          ) : null}
          {props.flight.arrival.actualTimeLocal ? (
            <Typography variant="body2" color="textSecondary" gutterBottom>
              {`Actual Time: ${props.flight.arrival.actualTimeLocal}`}
            </Typography>
          ) : null}
        </Box>
      </CardContent>
    </Card>
  );
};

FlightCard.propTypes = {
  dispatch: PropTypes.func,
  tripId: PropTypes.string,
  flight: PropTypes.shape({
    _id: PropTypes.string,
    number: PropTypes.string,
    airline: PropTypes.string,
    status: PropTypes.string,
    departure: PropTypes.shape({
      airport: PropTypes.shape({
        name: PropTypes.string,
        municipalityName: PropTypes.string,
        countryCode: PropTypes.string,
      }),
      gate: PropTypes.string,
      scheduledTimeLocal: PropTypes.string,
      actualTimeLocal: PropTypes.string,
    }),
    arrival: PropTypes.shape({
      airport: PropTypes.shape({
        name: PropTypes.string,
        municipalityName: PropTypes.string,
        countryCode: PropTypes.string,
      }),
      gate: PropTypes.string,
      scheduledTimeLocal: PropTypes.string,
      actualTimeLocal: PropTypes.string,
    }),
  }),
  // from redux
  deleteSuccessMessage: PropTypes.string,
  deleteLoading: PropTypes.bool,
  deleteError: PropTypes.shape({}),
};

const mapStateToProps = state => ({
  deleteSuccessMessage: state.flight.deleteFlight.deleteSuccessMessage,
  deleteLoading: state.flight.deleteFlight.deleteLoading,
  deleteError: state.flight.deleteFlight.deleteError,
});

export default connect(mapStateToProps)(FlightCard);
