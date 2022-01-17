import React from 'react';
import PropTypes from 'prop-types';
import {Box, List, ListItem, ListItemText, makeStyles} from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  listItemText: {
    marginRight: 10,
    marginLeft: 10,
    fontSize: 12,
    verticalAlign: 'sup',
    maxWidth: '20ch',
  },
  listItemSecondary: {
    paddingTop: theme.spacing(0.1),
  },
}));

export const HotelSelector = props => {
  const classes = useStyles();

  const handleSelectHotel = hotel => {
    props.createHotel(hotel);
  };

  return (
    <div>
      <Typography variant="h6" component="h2">
        Select a hotel:
      </Typography>
      <List component="div" disablePadding className={classes.root}>
        {props.hotel.map(hotel => (
          <Box key={hotel.name}>
            <ListItem button={true} onClick={() => handleSelectHotel(hotel)}>
              <ListItemText
                className={classes.listItemText}
                primary="Name"
                secondary={`${hotel.name}`}
              />
              <ListItemText
                className={classes.listItemText}
                primary="Price"
                secondary={`${hotel.price}`}
              />
              <ListItemText
                className={classes.listItemText}
                primary="Location"
                secondary={`${hotel.location}`}
              />
              <ListItemText
                className={classes.listItemText}
                primary="Check-in"
                secondary={`${hotel.checkIn}`}
              />
              <ListItemText
                className={classes.listItemText}
                primary="Check-out"
                secondary={`${hotel.checkOut}`}
              />
              <ListItemText
                className={classes.listItemText}
                primary="Number of ratings"
                secondary={`${hotel.numRating}`}
              />
              <ListItemText
                className={classes.listItemText}
                primary="Rating"
                secondary={`${hotel.rating}`}
              />
              <ListItemText
                className={classes.listItemText}
                primary="Price Level"
                secondary={`${hotel.priceLevel}`}
              />
            </ListItem>
            <Divider />
          </Box>
        ))}
      </List>
    </div>
  );
};

HotelSelector.propTypes = {
  hotel: PropTypes.array,
  createHotel: PropTypes.func.isRequired,
};

export default HotelSelector;
