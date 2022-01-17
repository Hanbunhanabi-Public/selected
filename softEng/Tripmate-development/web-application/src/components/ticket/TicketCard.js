import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import {Box, IconButton} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import usePrevious from '../../hooks/usePrevious';
import {fetchTicket} from '../../actions/ticket/fetchTicket';
import {deleteTicket} from '../../actions/ticket/deleteTicket';

const useStyles = makeStyles({
  root: {
    width: 250,
    marginRight: 20,
    marginBottom: 20,
  },
});

export const TicketCard = props => {
  const classes = useStyles();
  const prevLoadingState = usePrevious(props.deleteLoading);

  useEffect(() => {
    if (prevLoadingState && !props.deleteLoading && props.deleteError == null) {
      props.dispatch(fetchTicket(props.tripId));
    }
  });

  const handleDeleteTicket = () => {
    props.dispatch(deleteTicket(props.ticket._id));
  };

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography variant="subtitle1" component="h2">
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between">
            Type
            <IconButton color="primary" onClick={() => handleDeleteTicket()}>
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Box>
        </Typography>
        <Typography variant="body2" color="textSecondary" gutterBottom>
          {props.ticket.transportType}
        </Typography>
        <Divider />
        <Typography variant="subtitle1" component="h2">
          Departure
        </Typography>
        <Typography variant="body2" color="textSecondary" gutterBottom>
          {`${props.ticket.start.location} - ${props.ticket.start.date}`}
        </Typography>
        <Divider />
        <Typography variant="subtitle1" component="h2">
          Arrival
        </Typography>
        <Typography variant="body2" color="textSecondary" gutterBottom>
          {`${props.ticket.end.location} - ${props.ticket.end.date}`}
        </Typography>
        <Divider />
        <Typography variant="subtitle1" component="h2">
          Confirmation Number
        </Typography>
        <Typography variant="body2" color="textSecondary" gutterBottom>
          {props.ticket.confirmationNumber}
        </Typography>
        <Divider />
        <Typography variant="subtitle1" component="h2">
          Notes
        </Typography>
        <Typography variant="body2" color="textSecondary" gutterBottom>
          {props.ticket.notes}
        </Typography>
      </CardContent>
    </Card>
  );
};

TicketCard.propTypes = {
  dispatch: PropTypes.func,
  tripId: PropTypes.string,
  ticket: PropTypes.shape({
    _id: PropTypes.string,
    transportType: PropTypes.string.isRequired,
    start: PropTypes.shape({
      location: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
    }),
    end: PropTypes.shape({
      location: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
    }),
    confirmationNumber: PropTypes.string.isRequired,
    notes: PropTypes.string.isRequired,
  }),
  // from redux
  deleteSuccessMessage: PropTypes.string,
  deleteLoading: PropTypes.bool,
  deleteError: PropTypes.shape({}),
};

const mapStateToProps = state => ({
  deleteSuccessMessage: state.ticket.deleteTicket.deleteSuccessMessage,
  deleteLoading: state.ticket.deleteTicket.deleteLoading,
  deleteError: state.ticket.deleteTicket.deleteError,
});

export default connect(mapStateToProps)(TicketCard);
