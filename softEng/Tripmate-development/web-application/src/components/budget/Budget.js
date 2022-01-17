import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import {fetchBudgetList} from '../../actions/budget/fetchBudgetList';
import ConnectedBudgetCard from './BudgetCard';

export const Budget = props => {
  useEffect(() => {
    props.dispatch(fetchBudgetList(props.tripId));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return !props.loading ? (
    <ConnectedBudgetCard tripId={props.tripId} budget={props.budget} />
  ) : (
    <CircularProgress />
  );
};

Budget.propTypes = {
  tripId: PropTypes.string.isRequired,
  dispatch: PropTypes.func,
  budget: PropTypes.shape({}),
  loading: PropTypes.bool,
  expenseSummary: PropTypes.shape({
    available: PropTypes.number,
    planned: PropTypes.number,
    used: PropTypes.number,
  }),
  summaryLoading: PropTypes.bool,
  summaryError: PropTypes.shape({}),
};

const mapStateToProps = state => ({
  budget: state.budget.getBudgetList.budget,
  loading: state.budget.getBudgetList.loading,
  error: state.budget.getBudgetList.error,
  expenseSummary: state.budget.summary.summary,
  summaryLoading: state.budget.summary.summaryLoading,
  summaryError: state.budget.summary.summaryError,
});

export default connect(mapStateToProps)(Budget);
