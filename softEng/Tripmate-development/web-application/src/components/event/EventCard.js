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
import {fetchEvent} from '../../actions/event/fetchEvent';
import {deleteEvent} from '../../actions/event/deleteEvent';

const useStyles = makeStyles({
  root: {
    width: 250,
    marginRight: 20,
    marginBottom: 20,
  },
});

export const EventCard = props => {
  const classes = useStyles();
  const prevLoadingState = usePrevious(props.deleteLoading);

  useEffect(() => {
    if (prevLoadingState && !props.deleteLoading && props.deleteError == null) {
      props.dispatch(fetchEvent(props.tripId));
    }
  });

  const handleDeleteEvent = () => {
    props.dispatch(deleteEvent(props.event._id));
  };

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography variant="h6" component="h2" align="center">
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between">
            {props.event.title}
            <IconButton color="primary" onClick={() => handleDeleteEvent()}>
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Box>
        </Typography>
        <Typography variant="subtitle1" component="h2">
          Description
        </Typography>
        <Typography variant="body2" color="textSecondary" gutterBottom>
          {props.event.description}
        </Typography>
        <Divider />
        <Typography variant="subtitle1" component="h2">
          Location
        </Typography>
        <Typography variant="body2" color="textSecondary" gutterBottom>
          {props.event.location}
        </Typography>
        <Divider />
        <Typography variant="subtitle1" component="h2">
          End date
        </Typography>
        <Typography variant="body2" color="textSecondary" gutterBottom>
          {props.event.start}
        </Typography>
        <Divider />
        <Typography variant="subtitle1" component="h2">
          End date
        </Typography>
        <Typography variant="body2" color="textSecondary" gutterBottom>
          {props.event.end}
        </Typography>
        <Divider />
        <Typography variant="subtitle1" component="h2">
          Cost
        </Typography>
        <Typography variant="body2" color="textSecondary" gutterBottom>
          ${props.event.cost}
        </Typography>
      </CardContent>
    </Card>
  );
};

EventCard.propTypes = {
  dispatch: PropTypes.func,
  tripId: PropTypes.string,
  event: PropTypes.shape({
    _id: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    location: PropTypes.string,
    start: PropTypes.string,
    end: PropTypes.string,
    cost: PropTypes.number,
  }),
  // from redux
  deleteSuccessMessage: PropTypes.string,
  deleteLoading: PropTypes.bool,
  deleteError: PropTypes.shape({}),
};

const mapStateToProps = state => ({
  deleteSuccessMessage: state.event.deleteEvent.deleteSuccessMessage,
  deleteLoading: state.event.deleteEvent.deleteLoading,
  deleteError: state.event.deleteEvent.deleteError,
});

export default connect(mapStateToProps)(EventCard);
