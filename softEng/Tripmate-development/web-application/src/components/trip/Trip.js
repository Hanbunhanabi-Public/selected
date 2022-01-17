import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import {BudgetPanel} from '../budget/BudgetPanel';
import {TripCategoryView} from './TripCategoryView';
import ConnectedAddHotelDialog from '../hotel/AddHotelDialog';
import ConnectedAddFlightDialog from '../flight/AddFlightDialog';
import ConnectedAddTodoListDialog from '../todo/AddTodoListDialog';
import ConnectedAddTicketDialog from '../ticket/AddTicketDialog';
import ConnectedDeleteTripDialog from './DeleteTripDialog';
import ConnectedAddExpenseDialog from '../expense/AddExpenseDialog';
import ConnectedAddEventDialog from '../event/AddEventDialog';
import MONTHS from '../../utils/constants';

const useStyles = makeStyles({
  grid: {
    marginTop: 10,
  },
});

export const Trip = props => {
  const classes = useStyles();
  const [anchorElAddButton, setAnchorElAddButton] = useState(null);
  const [anchorElDisplayButton, setAnchorElDisplayButton] = useState(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isAddHotelDialogOpen, setIsAddHotelDialogOpen] = useState(false);
  const [isAddFlightDialogOpen, setIsFlightDialogOpen] = useState(false);
  const [isAddTodoListDialogOpen, setIsAddTodoListDialogOpen] = useState(false);
  const [isAddTicketDialogOpen, setIsAddTicketDialogOpen] = useState(false);
  const [isAddExpenseDialogOpen, setIsAddExpenseDialogOpen] = useState(false);
  const [isAddEventDialogOpen, setIsAddEventDialogOpen] = useState(false);

  const startDate = new Date(props.trip.startDate);
  const endDate = new Date(props.trip.endDate);

  const handleOpenAddMenu = event => {
    setAnchorElAddButton(event.currentTarget);
  };

  const handleCloseAddMenu = () => {
    setAnchorElAddButton(null);
  };

  const handleCloseDisplayMenu = () => {
    setAnchorElDisplayButton(null);
  };

  const handleCloseAddHotelDialog = () => {
    setAnchorElAddButton(null);
    setIsAddHotelDialogOpen(false);
  };

  const handleCloseAddFlightDialog = () => {
    setAnchorElAddButton(null);
    setIsFlightDialogOpen(false);
  };

  const handleCloseAddTodoListDialog = () => {
    setAnchorElAddButton(null);
    setIsAddTodoListDialogOpen(false);
  };

  const handleCloseAddTicketDialog = () => {
    setAnchorElAddButton(null);
    setIsAddTicketDialogOpen(false);
  };

  const handleCloseAddExpenseDialog = () => {
    setAnchorElAddButton(null);
    setIsAddExpenseDialogOpen(false);
  };

  const handleCloseAddEventDialog = () => {
    setAnchorElAddButton(null);
    setIsAddEventDialogOpen(false);
  };

  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        startIcon={<ArrowBackIosIcon />}
        onClick={() => props.onBackButtonClick()}>
        Trips
      </Button>
      <Grid
        className={classes.grid}
        justify="space-between"
        alignItems="center"
        container>
        <Grid item>
          <Typography variant="h4" component="h2">
            {props.trip.tripname}
          </Typography>
        </Grid>
        <Grid item>
          <IconButton
            onClick={() => setIsDeleteDialogOpen(true)}
            color="secondary">
            <DeleteIcon />
          </IconButton>
        </Grid>
      </Grid>
      <Typography variant="body1" color="textSecondary" gutterBottom>
        {`${startDate.getDate()}/${
          MONTHS[startDate.getMonth()]
        }/${startDate.getFullYear()} - ${endDate.getDate()}/${
          MONTHS[startDate.getMonth()]
        }/${endDate.getFullYear()}`}
      </Typography>
      <Divider />
      <Box display="flex" justifyContent="flex-end">
        <div>
          <Menu
            id="simple-menu-display"
            anchorEl={anchorElDisplayButton}
            keepMounted
            open={Boolean(anchorElDisplayButton)}
            onClose={handleCloseDisplayMenu}>
            <MenuItem onClick={handleCloseDisplayMenu}>Category</MenuItem>
            <MenuItem onClick={handleCloseDisplayMenu}>Timeline</MenuItem>
          </Menu>
          <IconButton color="primary" onClick={handleOpenAddMenu}>
            <AddIcon />
          </IconButton>
          <Menu
            id="simple-menu-add"
            anchorEl={anchorElAddButton}
            keepMounted
            open={Boolean(anchorElAddButton)}
            onClose={handleCloseAddMenu}>
            <MenuItem onClick={() => setIsAddExpenseDialogOpen(true)}>
              Expense
            </MenuItem>
            <MenuItem onClick={() => setIsFlightDialogOpen(true)}>
              Flight
            </MenuItem>
            <MenuItem onClick={() => setIsAddTicketDialogOpen(true)}>
              Ticket
            </MenuItem>
            <MenuItem onClick={() => setIsAddHotelDialogOpen(true)}>
              Hotel
            </MenuItem>
            <MenuItem onClick={() => setIsAddEventDialogOpen(true)}>
              Event
            </MenuItem>
            <MenuItem onClick={() => setIsAddTodoListDialogOpen(true)}>
              To-do
            </MenuItem>
          </Menu>
        </div>
      </Box>
      <BudgetPanel tripId={props.trip._id} />
      <TripCategoryView tripId={props.trip._id} />
      <ConnectedDeleteTripDialog
        open={isDeleteDialogOpen}
        handleClickOpen={() => setIsDeleteDialogOpen(true)}
        handleClose={() => setIsDeleteDialogOpen(false)}
        handleDeleteTrip={props.onBackButtonClick}
        tripId={props.trip._id}
      />
      <ConnectedAddHotelDialog
        open={isAddHotelDialogOpen}
        handleClickOpen={() => setIsAddHotelDialogOpen(true)}
        handleClose={() => handleCloseAddHotelDialog()}
        tripId={props.trip._id}
      />
      <ConnectedAddTicketDialog
        open={isAddTicketDialogOpen}
        handleClickOpen={() => setIsAddTicketDialogOpen(true)}
        handleClose={() => handleCloseAddTicketDialog()}
        tripId={props.trip._id}
      />
      <ConnectedAddFlightDialog
        open={isAddFlightDialogOpen}
        handleClickOpen={() => setIsFlightDialogOpen(true)}
        handleClose={() => handleCloseAddFlightDialog()}
        tripId={props.trip._id}
      />
      <ConnectedAddTodoListDialog
        open={isAddTodoListDialogOpen}
        handleClickOpen={() => setIsAddTodoListDialogOpen(true)}
        handleClose={() => handleCloseAddTodoListDialog()}
        tripId={props.trip._id}
      />
      <ConnectedAddExpenseDialog
        open={isAddExpenseDialogOpen}
        handleClickOpen={() => setIsAddExpenseDialogOpen(true)}
        handleClose={() => handleCloseAddExpenseDialog()}
        tripId={props.trip._id}
      />
      <ConnectedAddEventDialog
        open={isAddEventDialogOpen}
        handleClickOpen={() => setIsAddEventDialogOpen(true)}
        handleClose={() => handleCloseAddEventDialog()}
        tripId={props.trip._id}
      />
    </div>
  );
};

Trip.propTypes = {
  trip: PropTypes.shape({
    _id: PropTypes.string,
    tripname: PropTypes.string,
    startDate: PropTypes.string,
    endDate: PropTypes.string,
  }),
  onBackButtonClick: PropTypes.func.isRequired,
};

export default Trip;
