import axios from 'axios';
import {url} from '../../utils/globalVars';

export const ADD_BUDGET_BEGIN = 'ADD_BUDGET_LIST_BEGIN';
export const ADD_BUDGET_SUCCESS = 'ADD_BUDGET_LIST_SUCCESS';
export const ADD_BUDGET_FAILURE = 'ADD_BUDGET_LIST_FAILURE';

export const addBudgetBegin = () => ({
  type: ADD_BUDGET_BEGIN,
});

export const addBudgetSuccess = successMessage => ({
  type: ADD_BUDGET_SUCCESS,
  payload: {successMessage},
});

export const addBudgetFail = error => ({
  type: ADD_BUDGET_FAILURE,
  payload: {error},
});

export const addBudget = (tripId, newBudget) => {
  return dispatch => {
    dispatch(addBudgetBegin());

    return axios
      .post(url + '/budget/add/' + tripId, {budget: newBudget})
      .then(response => response.data)
      .then(successMessage => dispatch(addBudgetSuccess(successMessage)))
      .catch(error => dispatch(addBudgetFail(error)));
  };
};
