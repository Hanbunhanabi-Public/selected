import axios from 'axios';

export const ADD_EXPENSES_BEGIN = 'ADD_EXPENSES_BEGIN';
export const ADD_EXPENSES_SUCCESS = 'ADD_EXPENSES_SUCCESS';
export const ADD_EXPENSES_FAILURE = 'ADD_EXPENSES_FAILURE';

export const addExpensesBegin = () => ({
  type: ADD_EXPENSES_BEGIN,
});

export const addExpensesSuccess = successMessage => ({
  type: ADD_EXPENSES_SUCCESS,
  payload: {successMessage},
});

export const addExpensesFail = error => ({
  type: ADD_EXPENSES_FAILURE,
  payload: {error},
});

export const addExpenses = (id, newExpenses) => {
  return dispatch => {
    dispatch(addExpensesBegin());

    return axios
      .post(`/budget/${id}/expenses/add`, {
        expenses: newExpenses,
      })
      .then(response => response.data)
      .then(successMessage => dispatch(addExpensesSuccess(successMessage)))
      .catch(error => dispatch(addExpensesFail(error)));
  };
};
