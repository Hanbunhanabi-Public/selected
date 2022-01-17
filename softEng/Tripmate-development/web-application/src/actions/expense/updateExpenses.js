import axios from 'axios';

export const UPDATE_EXPENSES_BEGIN = 'UPDATE_EXPENSES_BEGIN';
export const UPDATE_EXPENSES_SUCCESS = 'UPDATE_EXPENSES_SUCCESS';
export const UPDATE_EXPENSES_FAILURE = 'UPDATE_EXPENSES_FAILURE';

export const updateExpensesBegin = () => ({
  type: UPDATE_EXPENSES_BEGIN,
});

export const updateExpensesSuccess = successMessage => ({
  type: UPDATE_EXPENSES_SUCCESS,
  payload: {successMessage},
});

export const updateExpensesFail = error => ({
  type: UPDATE_EXPENSES_FAILURE,
  payload: {error},
});

export const updateExpenses = (budgetId, expensesID, newExpenses) => {
  return dispatch => {
    dispatch(updateExpensesBegin());

    return axios
      .post(`/budget/${budgetId}/expenses/update/${expensesID}`, newExpenses)
      .then(response => response.data)
      .then(successMessage => dispatch(updateExpensesSuccess(successMessage)))
      .catch(error => dispatch(updateExpensesFail(error)));
  };
};
