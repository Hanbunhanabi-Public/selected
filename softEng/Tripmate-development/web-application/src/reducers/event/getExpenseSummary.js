import {
  GET_EXPENSE_SUMMARY_BEGIN,
  GET_EXPENSE_SUMMARY_SUCCESS,
  GET_EXPENSE_SUMMARY_FAILURE,
} from '../../actions/expense/fetchExpenseSummary';

import createReducer from '../createReducer';

const initialState = {
  summary: {},
  summaryLoading: true,
  summaryError: null,
};

const getExpenseSummaryBeginState = state => ({
  ...state,
  summaryLoading: true,
  summaryError: null,
});

const getExpenseSummarySuccessState = (state, action) => ({
  ...state,
  summaryLoading: false,
  summary: action.payload.summary,
});

const getExpenseSummaryFailureState = (state, action) => ({
  ...state,
  summary: {},
  summaryLoading: false,
  summaryError: action.payload.error,
});
const getExpenseSummary = createReducer(initialState, {
  [GET_EXPENSE_SUMMARY_BEGIN]: getExpenseSummaryBeginState,
  [GET_EXPENSE_SUMMARY_SUCCESS]: getExpenseSummarySuccessState,
  [GET_EXPENSE_SUMMARY_FAILURE]: getExpenseSummaryFailureState,
});

export default getExpenseSummary;
