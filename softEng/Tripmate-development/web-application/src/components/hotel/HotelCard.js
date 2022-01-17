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
import {fetchHotel} from '../../actions/hotel/fetchHotel';
import {deleteHotel} from '../../actions/hotel/deleteHotel';

const useStyles = makeStyles({
  root: {
    width: 250,
    marginRight: 20,
    marginBottom: 20,
  },
});

export const HotelCard = props => {
  const classes = useStyles();
  const prevLoadingState = usePrevious(props.deleteLoading);

  useEffect(() => {
    if (prevLoadingState && !props.deleteLoading && props.deleteError == null) {
      props.dispatch(fetchHotel(props.tripId));
    }
  });

  const handleDeleteHotel = () => {
    props.dispatch(deleteHotel(props.hotel._id));
  };

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography variant="h6" component="h2" align="center">
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between">
            {props.hotel.name}
            <IconButton color="primary" onClick={() => handleDeleteHotel()}>
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Box>
        </Typography>
        <Typography variant="subtitle1" component="h2">
          Price
        </Typography>
        <Typography variant="body2" color="textSecondary" gutterBottom>
          {props.hotel.price}
        </Typography>
        <Divider />
        <Typography variant="subtitle1" component="h2">
          Location
        </Typography>
        <Typography variant="body2" color="textSecondary" gutterBottom>
          {props.hotel.location}
        </Typography>
        <Divider />
        <Typography variant="subtitle1" component="h2">
          Check in
        </Typography>
        <Typography variant="body2" color="textSecondary" gutterBottom>
          {props.hotel.checkIn}
        </Typography>
        <Divider />
        <Typography variant="subtitle1" component="h2">
          Check out
        </Typography>
        <Typography variant="body2" color="textSecondary" gutterBottom>
          {props.hotel.checkOut}
        </Typography>
        <Divider />
        <Typography variant="subtitle1" component="h2">
          Number rating
        </Typography>
        <Typography variant="body2" color="textSecondary" gutterBottom>
          {props.hotel.numRating}
        </Typography>
        <Divider />
        <Typography variant="subtitle1" component="h2">
          Rating
        </Typography>
        <Typography variant="body2" color="textSecondary" gutterBottom>
          {props.hotel.rating}
        </Typography>
        <Divider />
        <Typography variant="subtitle1" component="h2">
          Price level
        </Typography>
        <Typography variant="body2" color="textSecondary" gutterBottom>
          {props.hotel.priceLevel}
        </Typography>
      </CardContent>
    </Card>
  );
};

HotelCard.propTypes = {
  dispatch: PropTypes.func,
  tripId: PropTypes.string,
  hotel: PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
    price: PropTypes.string,
    location: PropTypes.string,
    checkIn: PropTypes.string,
    checkOut: PropTypes.string,
    numRating: PropTypes.string,
    rating: PropTypes.string,
    priceLevel: PropTypes.string,
  }),
  // from redux
  deleteSuccessMessage: PropTypes.string,
  deleteLoading: PropTypes.bool,
  deleteError: PropTypes.shape({}),
};

const mapStateToProps = state => ({
  deleteSuccessMessage: state.hotel.deleteHotel.deleteSuccessMessage,
  deleteLoading: state.hotel.deleteHotel.deleteLoading,
  deleteError: state.hotel.deleteHotel.deleteError,
});

export default connect(mapStateToProps)(HotelCard);
