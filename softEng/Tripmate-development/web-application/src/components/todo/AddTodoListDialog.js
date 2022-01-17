import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import {connect} from 'react-redux';
import {createToDoList} from '../../actions/todo/createToDoList';
import {fetchToDoList} from '../../actions/todo/fetchToDoList';
import usePrevious from '../../hooks/usePrevious';

export const AddTodoListDialog = props => {
  const [listName, setListName] = useState('');
  const prevLoadingState = usePrevious(props.loading);

  useEffect(() => {
    if (prevLoadingState && !props.loading && props.error == null) {
      props.dispatch(fetchToDoList(props.tripId));
      props.handleClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.loading]);

  const handleSave = () => {
    props.dispatch(createToDoList(props.tripId, listName));
  };

  return (
    <div>
      <Dialog
        open={props.open}
        onClose={() => props.handleClose()}
        aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add To-do List</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="listName"
            label="List Name"
            type="string"
            fullWidth
            onChange={e => setListName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button
            disabled={props.loading}
            onClick={() => props.handleClose()}
            color="secondary">
            Cancel
          </Button>
          <Button
            disabled={props.loading}
            variant="contained"
            onClick={handleSave}
            color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

AddTodoListDialog.propTypes = {
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
  successMessage: state.todolist.createToDoList.successMessage,
  loading: state.todolist.createToDoList.createLoading,
  error: state.todolist.createToDoList.createError,
});

export default connect(mapStateToProps)(AddTodoListDialog);
