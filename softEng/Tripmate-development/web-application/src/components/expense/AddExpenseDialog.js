import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import {connect} from 'react-redux';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import usePrevious from '../../hooks/usePrevious';
import {fetchBudgetList} from '../../actions/budget/fetchBudgetList';
import {addExpenses} from '../../actions/expense/addExpenses';
import {fetchExpenseSummary} from '../../actions/expense/fetchExpenseSummary';

export const AddExpenseDialog = props => {
  const [expenseName, setExpenseName] = useState('');
  const [expenseAmount, setExpenseAmount] = useState('');
  const prevLoadingState = usePrevious(props.addExpenseLoading);

  useEffect(() => {
    props.dispatch(fetchBudgetList(props.tripId));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (
      prevLoadingState &&
      !props.addExpenseLoading &&
      props.addExpenseError == null
    ) {
      props.dispatch(fetchBudgetList(props.tripId));
      props.dispatch(fetchExpenseSummary(props.budget._id));
      props.handleClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.addExpenseLoading]);

  const handleSave = () => {
    props.dispatch(
      addExpenses(props.budget._id, {
        name: expenseName,
        isDone: false,
        amount: expenseAmount,
      }),
    );
  };

  return (
    <div>
      <Dialog
        open={props.open}
        onClose={() => props.handleClose()}
        aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add Expense</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="expenseName"
            label="Expense name"
            type="string"
            fullWidth
            onChange={e => setExpenseName(e.target.value)}
          />
          <FormControl fullWidth>
            <InputLabel htmlFor="standard-adornment-amount">Amount</InputLabel>
            <Input
              id="standard-adornment-amount"
              value={expenseAmount}
              onChange={e => setExpenseAmount(e.target.value)}
              startAdornment={
                <InputAdornment position="start">$</InputAdornment>
              }
            />
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button
            disabled={props.addExpenseLoading}
            onClick={() => props.handleClose()}
            color="secondary">
            Cancel
          </Button>
          <Button
            disabled={props.getBudgetLoading || props.addExpenseLoading}
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

AddExpenseDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClickOpen: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  tripId: PropTypes.string.isRequired,
  // from redux
  dispatch: PropTypes.func,
  budget: PropTypes.shape({
    _id: PropTypes.string,
  }),
  getBudgetLoading: PropTypes.bool,
  getBudgetError: PropTypes.shape({}),
  addExpenseSuccessMessage: PropTypes.string,
  addExpenseLoading: PropTypes.bool,
  addExpenseError: PropTypes.shape({}),
};

const mapStateToProps = state => ({
  budget: state.budget.getBudgetList.budget,
  getBudgetLoading: state.budget.getBudgetList.loading,
  getBudgetError: state.budget.getBudgetList.error,
  addExpenseSuccessMessage: state.budget.addExpenses.successMessage,
  addExpenseLoading: state.budget.addExpenses.uploading,
  addExpenseError: state.budget.addExpenses.error,
});

export default connect(mapStateToProps)(AddExpenseDialog);
