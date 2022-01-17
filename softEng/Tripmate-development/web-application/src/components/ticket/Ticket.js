import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import {fetchTicket} from '../../actions/ticket/fetchTicket';
import ConnectedTicketCard from './TicketCard';

export const Ticket = props => {
  // on mount
  useEffect(() => {
    props.dispatch(fetchTicket(props.tripId));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return !props.loading ? (
    <Box display="flex" flexWrap="wrap">
      {props.ticket.map((ticket, _id) => (
        <ConnectedTicketCard key={_id} tripId={props.tripId} ticket={ticket} />
      ))}
      {props.ticket.length < 1 ? (
        <Box display="flex" alignItems="center">
          <Typography variant="h6" component="h2">
            You currently do not have any tickets.
          </Typography>
        </Box>
      ) : null}
    </Box>
  ) : (
    <CircularProgress />
  );
};

Ticket.propTypes = {
  tripId: PropTypes.string.isRequired,
  dispatch: PropTypes.func,
  ticket: PropTypes.array,
  loading: PropTypes.bool,
};

const mapStateToProps = state => ({
  ticket: state.ticket.getTicket.ticket,
  loading: state.ticket.getTicket.loading,
  error: state.ticket.getTicket.error,
});

export default connect(mapStateToProps)(Ticket);
