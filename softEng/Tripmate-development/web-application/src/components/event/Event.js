import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import {fetchEvent} from '../../actions/event/fetchEvent';
import ConnectedEventCard from './EventCard';

export const Event = props => {
  // on mount
  useEffect(() => {
    props.dispatch(fetchEvent(props.tripId));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return !props.loading ? (
    <Box display="flex" flexWrap="wrap">
      {props.event.map((event, _id) => (
        <ConnectedEventCard tripId={props.tripId} key={_id} event={event} />
      ))}
      {props.event.length < 1 ? (
        <Box display="flex" alignItems="center">
          <Typography variant="h6" component="h2">
            You currently do not have any events.
          </Typography>
        </Box>
      ) : null}
    </Box>
  ) : (
    <CircularProgress />
  );
};

Event.propTypes = {
  tripId: PropTypes.string.isRequired,
  dispatch: PropTypes.func,
  event: PropTypes.array,
  loading: PropTypes.bool,
};

const mapStateToProps = state => ({
  event: state.event.getEvent.event,
  loading: state.event.getEvent.loading,
  error: state.event.getEvent.error,
});

export default connect(mapStateToProps)(Event);
