import axios from 'axios';
import {url} from '../../utils/globalVars';

export const GET_EXPENSE_SUMMARY_BEGIN = 'GET_EXPENSE_SUMMARY_BEGIN';
export const GET_EXPENSE_SUMMARY_SUCCESS = 'GET_EXPENSE_SUMMARY_SUCCESS';
export const GET_EXPENSE_SUMMARY_FAILURE = 'GET_EXPENSE_SUMMARY_FAILURE';

export const fetchExpenseSummaryBegin = () => ({
  type: GET_EXPENSE_SUMMARY_BEGIN,
});

export const fetchExpenseSummarySuccess = summary => ({
  type: GET_EXPENSE_SUMMARY_SUCCESS,
  payload: {summary},
});

export const fetchExpenseSummaryFailure = error => ({
  type: GET_EXPENSE_SUMMARY_FAILURE,
  payload: {error},
});

export const fetchExpenseSummary = id => {
  return dispatch => {
    dispatch(fetchExpenseSummaryBegin());
    return axios
      .get(url + '/budget/' + id + '/expenses/summary')
      .then(response => response.data)
      .then(summary => dispatch(fetchExpenseSummarySuccess(summary)))
      .catch(error => dispatch(fetchExpenseSummaryFailure(error)));
  };
};
