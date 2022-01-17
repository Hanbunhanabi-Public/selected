import axios from 'axios';
import {url} from '../../utils/globalVars';

export const GET_EXPENSES_BEGIN = 'GET_EXPENSES_BEGIN';
export const GET_EXPENSES_SUCCESS = 'GET_EXPENSES_SUCCESS';
export const GET_EXPENSES_FAILURE = 'GET_EXPENSES_FAILURE';

export const fetchExpensesBegin = () => ({
  type: GET_EXPENSES_BEGIN,
});

export const fetchExpensesSuccess = expenses => ({
  type: GET_EXPENSES_SUCCESS,
  payload: {expenses},
});

export const fetchExpensesFailure = error => ({
  type: GET_EXPENSES_FAILURE,
  payload: {error},
});

export const fetchExpenses = (budgetId, expensesId) => {
  return dispatch => {
    dispatch(fetchExpensesBegin());

    return axios
      .get(url + '/budget/' + budgetId + '/expenses/' + expensesId)
      .then(response => response.data)
      .then(expenses => dispatch(fetchExpensesSuccess(expenses)))
      .catch(error => dispatch(fetchExpensesFailure(error)));
  };
};
