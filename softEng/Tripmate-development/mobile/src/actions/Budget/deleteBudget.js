import axios from 'axios';
import {url} from '../../utils/globalVars';

export const DELETE_BUDGET_BEGIN = 'DELETE_BUDGET_BEGIN';
export const DELETE_BUDGET_SUCCESS = 'DELETE_BUDGET_SUCCESS';
export const DELETE_BUDGET_FAILURE = 'DELETE_BUDGET_FAILURE';

export const deleteBudgetBegin = () => ({
  type: DELETE_BUDGET_BEGIN,
});

export const deleteBudgetSuccess = deleteSuccessMessage => ({
  type: DELETE_BUDGET_SUCCESS,
  payload: {deleteSuccessMessage},
});

export const deleteBudgetFail = error => ({
  type: DELETE_BUDGET_FAILURE,
  payload: {error},
});

export const deleteBudget = targetBudget => {
  return dispatch => {
    dispatch(deleteBudgetBegin());

    return axios
      .delete(url + '/budget/' + targetBudget._id)
      .then(response => response.data)
      .then(deleteSuccessMessage =>
        dispatch(deleteBudgetSuccess(deleteSuccessMessage)),
      )
      .catch(error => dispatch(deleteBudgetFail(error)));
  };
};
