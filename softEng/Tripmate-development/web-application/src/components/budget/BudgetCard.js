import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import {Box, Checkbox, FormControlLabel, IconButton} from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import DeleteIcon from '@material-ui/icons/Delete';
import SaveIcon from '@material-ui/icons/Save';
import EditIcon from '@material-ui/icons/Edit';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import {fetchExpenseSummary} from '../../actions/expense/fetchExpenseSummary';
import {updateExpenses} from '../../actions/expense/updateExpenses';
import usePrevious from '../../hooks/usePrevious';
import {fetchBudgetList} from '../../actions/budget/fetchBudgetList';
import {updateBudget} from '../../actions/budget/updateBudget';
import {deleteExpenses} from '../../actions/expense/deleteExpenses';

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  form: {
    marginBottom: 15,
  },
});

export const BudgetCard = props => {
  const classes = useStyles();
  const [isEditingBudgetAmount, setIsEditingBudgetAmount] = useState(false);
  const [newBudgetAmount, setNewBudgetAmount] = useState('');
  const prevUpdateLoadingState = usePrevious(props.updateExpenseLoading);
  const prevDeleteLoadingState = usePrevious(props.deleteLoading);
  const prevUpdateBudgetLoadingState = usePrevious(props.updateBudgetLoading);

  // on mount
  useEffect(() => {
    props.dispatch(fetchExpenseSummary(props.budget._id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (
      prevUpdateLoadingState &&
      !props.updateExpenseLoading &&
      props.updateExpenseError == null
    ) {
      props.dispatch(fetchBudgetList(props.tripId));
      props.dispatch(fetchExpenseSummary(props.budget._id));
    }

    if (
      prevDeleteLoadingState &&
      !props.deleteLoading &&
      props.deleteError == null
    ) {
      props.dispatch(fetchBudgetList(props.tripId));
      props.dispatch(fetchExpenseSummary(props.budget._id));
    }

    if (
      prevUpdateBudgetLoadingState &&
      !props.updateBudgetLoading &&
      props.updateBudgetError == null
    ) {
      props.dispatch(fetchBudgetList(props.tripId));
      props.dispatch(fetchExpenseSummary(props.budget._id));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    props.updateExpenseLoading,
    props.deleteLoading,
    props.updateBudgetLoading,
  ]);

  const handleExpenseUpdate = (isDone, expenseId) => {
    props.dispatch(
      updateExpenses(props.budget._id, expenseId, {
        isDone,
      }),
    );
  };

  const handleBudgetUpdate = () => {
    props.dispatch(updateBudget(props.budget._id, newBudgetAmount));
  };

  const handleDeleteExpenses = expense => {
    props.dispatch(deleteExpenses(props.budget._id, expense));
  };

  return (
    <Box className={classes.root}>
      {isEditingBudgetAmount ? (
        <Box className={classes.form}>
          <FormControl>
            <InputLabel htmlFor="standard-adornment-amount">
              Trip budget
            </InputLabel>
            <Input
              id="standard-adornment-amount"
              defaultValue={props.budget.budget}
              onChange={e => setNewBudgetAmount(e.target.value)}
              startAdornment={
                <InputAdornment position="start">$</InputAdornment>
              }
            />
          </FormControl>
          <IconButton color="primary" onClick={() => handleBudgetUpdate()}>
            <SaveIcon fontSize="small" />
          </IconButton>
        </Box>
      ) : (
        <Typography variant="h6" component="h2" align="center">
          ${props.budget.budget}
          <IconButton
            color="primary"
            onClick={() => setIsEditingBudgetAmount(true)}>
            <EditIcon fontSize="small" />
          </IconButton>
        </Typography>
      )}
      <Divider />
      {!props.summaryLoading ? (
        <Box display="flex" justifyContent="space-between">
          <div>
            <Typography variant="subtitle1" component="h2" align="center">
              Available
            </Typography>
            <Typography
              variant="subtitle1"
              component="h2"
              align="center"
              color="textSecondary">
              {props.expenseSummary.available}
            </Typography>
          </div>
          <div>
            <Typography variant="subtitle1" component="h2" align="center">
              Planned
            </Typography>
            <Typography
              variant="subtitle1"
              component="h2"
              align="center"
              color="textSecondary">
              {props.expenseSummary.planned}
            </Typography>
          </div>
          <div>
            <Typography variant="subtitle1" component="h2" align="center">
              Used
            </Typography>
            <Typography
              variant="subtitle1"
              component="h2"
              align="center"
              color="textSecondary">
              {props.expenseSummary.used}
            </Typography>
          </div>
        </Box>
      ) : null}
      <Box display="grid">
        {props.budget.expenses.map(expense => (
          <div key={expense._id}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={expense.isDone}
                  value={expense._id}
                  onChange={e =>
                    handleExpenseUpdate(e.target.checked, expense._id)
                  }
                  color="primary"
                />
              }
              label={`${expense.name} - $${expense.amount}`}
            />
            <IconButton onClick={() => handleDeleteExpenses(expense)}>
              <DeleteIcon fontSize="small" />
            </IconButton>
          </div>
        ))}
      </Box>
    </Box>
  );
};

BudgetCard.propTypes = {
  dispatch: PropTypes.func,
  budget: PropTypes.shape({
    _id: PropTypes.string,
    budget: PropTypes.number,
    expenses: PropTypes.array,
  }),
  tripId: PropTypes.string.isRequired,
  // from redux
  expenseSummary: PropTypes.shape({
    available: PropTypes.number,
    planned: PropTypes.number,
    used: PropTypes.number,
  }),
  summaryLoading: PropTypes.bool,
  summaryError: PropTypes.shape({}),
  updateExpenseSuccessMessage: PropTypes.string,
  updateExpenseLoading: PropTypes.bool,
  updateExpenseError: PropTypes.shape({}),
  deleteMessage: PropTypes.string,
  deleteLoading: PropTypes.bool,
  deleteError: PropTypes.shape({}),
  updateBudgetSuccessMessage: PropTypes.string,
  updateBudgetLoading: PropTypes.bool,
  updateBudgetError: PropTypes.shape({}),
};

const mapStateToProps = state => ({
  expenseSummary: state.budget.summary.summary,
  summaryLoading: state.budget.summary.summaryLoading,
  summaryError: state.budget.summary.summaryError,
  updateExpenseSuccessMessage: state.budget.updateExpenses.summary,
  updateExpenseLoading: state.budget.updateExpenses.uploading,
  updateExpenseError: state.budget.updateExpenses.error,
  deleteMessage: state.budget.deleteExpenses.deleteMessage,
  deleteLoading: state.budget.deleteExpenses.deleting,
  deleteError: state.budget.deleteExpenses.error,
  updateBudgetSuccessMessage: state.budget.updateBudget.successMessage,
  updateBudgetLoading: state.budget.updateBudget.uploading,
  updateBudgetError: state.budget.updateBudget.error,
});

export default connect(mapStateToProps)(BudgetCard);
