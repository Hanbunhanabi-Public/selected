import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import {connect} from 'react-redux';
import {fetchFlight} from '../../actions/flight/fetchFlight';
import ConnectedAddFlight from './AddFlight';
import usePrevious from '../../hooks/usePrevious';

export const AddFlightDialog = props => {
  const prevLoadingState = usePrevious(props.loading);

  useEffect(() => {
    if (prevLoadingState && !props.loading && props.error == null) {
      props.dispatch(fetchFlight(props.tripId));
      props.handleClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.loading]);

  return (
    <div>
      <Dialog
        open={props.open}
        onClose={() => props.handleClose()}
        aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add Flight</DialogTitle>
        <DialogContent>
          <ConnectedAddFlight
            tripId={props.tripId}
            closeAddFlightDialog={props.handleClose}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

AddFlightDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClickOpen: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  tripId: PropTypes.string.isRequired,
  // from redux
  dispatch: PropTypes.func,
  successMessage: PropTypes.array,
  loading: PropTypes.bool,
  error: PropTypes.shape({}),
};

const mapStateToProps = state => ({
  successMessage: state.flight.createFlight.successMessage,
  loading: state.flight.createFlight.createLoading,
  error: state.flight.createFlight.createError,
});

export default connect(mapStateToProps)(AddFlightDialog);
