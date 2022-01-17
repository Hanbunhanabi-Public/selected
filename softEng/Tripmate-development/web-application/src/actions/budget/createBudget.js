import axios from 'axios';

export const CREATE_BUDGET_BEGIN = 'CREATE_BUDGET_BEGIN';
export const CREATE_BUDGET_SUCCESS = 'CREATE_BUDGET_SUCCESS';
export const CREATE_BUDGET_FAILURE = 'CREATE_BUDGET_FAILURE';

export const createBudgetBegin = () => ({
  type: CREATE_BUDGET_BEGIN,
});

export const createBudgetSuccess = successMessage => ({
  type: CREATE_BUDGET_SUCCESS,
  payload: {successMessage},
});

export const createBudgetFail = error => ({
  type: CREATE_BUDGET_FAILURE,
  payload: {error},
});

export const createBudget = (tripId, newBudget) => {
  return dispatch => {
    dispatch(createBudgetBegin());

    return axios
      .post(`/budget/add/${tripId}`, {budget: newBudget})
      .then(response => response.data)
      .then(successMessage => dispatch(createBudgetSuccess(successMessage)))
      .catch(error => dispatch(createBudgetFail(error)));
  };
};
