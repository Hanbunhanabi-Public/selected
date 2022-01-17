import axios from 'axios';

export const DELETE_EXPENSES_BEGIN = 'DELETE_EXPENSES_BEGIN';
export const DELETE_EXPENSES_SUCCESS = 'DELETE_EXPENSES_SUCCESS';
export const DELETE_EXPENSES_FAILURE = 'DELETE_EXPENSES_FAILURE';

export const deleteExpensesBegin = () => ({
  type: DELETE_EXPENSES_BEGIN,
});

export const deleteExpensesSuccess = deleteSuccessMessage => ({
  type: DELETE_EXPENSES_SUCCESS,
  payload: {deleteSuccessMessage},
});

export const deleteExpensesFail = error => ({
  type: DELETE_EXPENSES_FAILURE,
  payload: {error},
});

export const deleteExpenses = (id, targetExpenses) => {
  return dispatch => {
    dispatch(deleteExpensesBegin());

    return axios
      .delete(`/budget/${id}/expenses/${targetExpenses._id}`)
      .then(response => response.data)
      .then(deleteSuccessMessage =>
        dispatch(deleteExpensesSuccess(deleteSuccessMessage)),
      )
      .catch(error => dispatch(deleteExpensesFail(error)));
  };
};
