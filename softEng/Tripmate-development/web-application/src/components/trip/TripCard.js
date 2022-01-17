import React from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import MONTHS from '../../utils/constants';

const useStyles = makeStyles({
  root: {
    width: 250,
    marginRight: 20,
    marginBottom: 20,
    display: 'grid',
  },
  cardActions: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
});

export const TripCard = props => {
  const classes = useStyles();
  const startDate = new Date(props.trip.startDate);
  const endDate = new Date(props.trip.endDate);

  return (
    <Card className={classes.root}>
      <CardContent className={classes.cardContent}>
        <Typography variant="h5" component="h2">
          {props.trip.tripname}
        </Typography>
        <Typography variant="body2" color="textSecondary" gutterBottom>
          {`${startDate.getDate()}/${
            MONTHS[startDate.getMonth()]
          }/${startDate.getFullYear()} - ${endDate.getDate()}/${
            MONTHS[startDate.getMonth()]
          }/${endDate.getFullYear()}`}
        </Typography>
        <Divider />
        <p>{props.trip.description}</p>
      </CardContent>
      {props.canView ? (
        <CardActions className={classes.cardActions}>
          <Button
            onClick={() => props.onViewTripClick(props.trip)}
            size="small"
            color="primary">
            View trip
          </Button>
        </CardActions>
      ) : null}
    </Card>
  );
};

TripCard.propTypes = {
  trip: PropTypes.shape({
    tripname: PropTypes.string.isRequired,
    startDate: PropTypes.string.isRequired,
    endDate: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }),
  onViewTripClick: PropTypes.func.isRequired,
  canView: PropTypes.bool,
};

export default TripCard;
