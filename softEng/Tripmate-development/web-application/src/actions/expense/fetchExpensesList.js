import axios from 'axios';

export const GET_EXPENSES_LIST_BEGIN = 'GET_EXPENSES_LIST_BEGIN';
export const GET_EXPENSES_LIST_SUCCESS = 'GET_EXPENSES_LIST_SUCCESS';
export const GET_EXPENSES_LIST_FAILURE = 'GET_EXPENSES_LIST_FAILURE';

export const fetchExpensesListBegin = () => ({
  type: GET_EXPENSES_LIST_BEGIN,
});

export const fetchExpensesListSuccess = expensesList => ({
  type: GET_EXPENSES_LIST_SUCCESS,
  payload: {expensesList},
});

export const fetchExpensesListFailure = error => ({
  type: GET_EXPENSES_LIST_FAILURE,
  payload: {error},
});

export const fetchExpensesList = id => {
  return dispatch => {
    dispatch(fetchExpensesListBegin());

    return axios
      .get(`/budget/${id}/expenses/sorted`)
      .then(response => response.data)
      .then(expensesList => dispatch(fetchExpensesListSuccess(expensesList)))
      .catch(error => dispatch(fetchExpensesListFailure(error)));
  };
};
