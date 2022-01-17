import axios from 'axios';
import {url} from '../../utils/globalVars';

export const UPDATE_BUDGET_BEGIN = 'UPDATE_BUDGET_BEGIN';
export const UPDATE_BUDGET_SUCCESS = 'UPDATE_BUDGET_SUCCESS';
export const UPDATE_BUDGET_FAILURE = 'UPDATE_BUDGET_FAILURE';

export const updateBudgetBegin = () => ({
  type: UPDATE_BUDGET_BEGIN,
});

export const updateBudgetSuccess = successMessage => ({
  type: UPDATE_BUDGET_SUCCESS,
  payload: {successMessage},
});

export const updateBudgetFail = error => ({
  type: UPDATE_BUDGET_FAILURE,
  payload: {error},
});

export const updateBudget = (id, newBudget) => {
  return dispatch => {
    dispatch(updateBudgetBegin());

    return axios
      .post(url + '/budget/' + id + '/update', {budget: newBudget})
      .then(response => response.data)
      .then(successMessage => dispatch(updateBudgetSuccess(successMessage)))
      .catch(error => dispatch(updateBudgetFail(error)));
  };
};
