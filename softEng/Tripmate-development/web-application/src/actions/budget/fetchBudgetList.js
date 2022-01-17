import axios from 'axios';

export const GET_BUDGET_LIST_BEGIN = 'GET_BUDGET_LIST_BEGIN';
export const GET_BUDGET_LIST_SUCCESS = 'GET_BUDGET_LIST_SUCCESS';
export const GET_BUDGET_LIST_FAILURE = 'GET_BUDGET_LIST_FAILURE';

export const fetchBudgetListBegin = () => ({
  type: GET_BUDGET_LIST_BEGIN,
});

export const fetchBudgetListSuccess = budget => ({
  type: GET_BUDGET_LIST_SUCCESS,
  payload: {budget},
});

export const fetchBudgetListFailure = error => ({
  type: GET_BUDGET_LIST_FAILURE,
  payload: {error},
});

export const fetchBudgetList = tripId => {
  return dispatch => {
    dispatch(fetchBudgetListBegin());

    return axios
      .get(`/budget/trip/${tripId}`)
      .then(response => response.data)
      .then(budget => dispatch(fetchBudgetListSuccess(budget)))
      .catch(error => dispatch(fetchBudgetListFailure(error)));
  };
};
