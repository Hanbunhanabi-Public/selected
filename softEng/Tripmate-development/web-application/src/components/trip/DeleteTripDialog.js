import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {deleteTrip} from '../../actions/trip/deleteTrip';
import usePrevious from '../../hooks/usePrevious';
import {fetchTrips} from '../../actions/trip/fetchTrips';

export const DeleteTripDialog = props => {
  const prevLoadingState = usePrevious(props.loading);

  useEffect(() => {
    if (prevLoadingState && !props.loading && props.error == null) {
      props.dispatch(fetchTrips(props.userId));
      props.handleDeleteTrip();
      props.handleClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.loading]);

  const handleDeleteTrip = () => {
    props.dispatch(deleteTrip(props.tripId));
  };

  return (
    <div>
      <Dialog
        open={props.open}
        onClose={() => props.handleClose()}
        aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Delete Trip</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this trip? In doing so you will not
            be able to recover this trip.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button disabled={props.loading} onClick={() => props.handleClose()}>
            Cancel
          </Button>
          <Button
            disabled={props.loading}
            variant="contained"
            onClick={handleDeleteTrip}
            color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

DeleteTripDialog.propTypes = {
  dispatch: PropTypes.func,
  open: PropTypes.bool.isRequired,
  handleClickOpen: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  tripId: PropTypes.string.isRequired,
  handleDeleteTrip: PropTypes.func.isRequired,
  // from redux
  deleteMessage: PropTypes.string,
  loading: PropTypes.bool,
  error: PropTypes.shape({}),
  userId: PropTypes.string,
};

const mapStateToProps = state => ({
  deleteMessage: state.trip.deleteTrip.deleteMessage,
  loading: state.trip.deleteTrip.deleting,
  error: state.trip.deleteTrip.error,
  userId: state.auth.user._id,
});

export default connect(mapStateToProps)(DeleteTripDialog);
