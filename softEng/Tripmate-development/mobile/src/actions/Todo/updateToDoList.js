import axios from 'axios';
import {url} from '../../utils/globalVars';

export const UPDATE_TODO_LIST_BEGIN = 'UPDATE_TODO_LIST_BEGIN';
export const UPDATE_TODO_LIST_SUCCESS = 'UPDATE_TODO_LIST_SUCCESS';
export const UPDATE_TODO_LIST_FAILURE = 'UPDATE_TODO_LIST_FAILURE';

export const updateToDoListBegin = () => ({
  type: UPDATE_TODO_LIST_BEGIN,
});

export const updateToDoListSuccess = successMessage => ({
  type: UPDATE_TODO_LIST_SUCCESS,
  payload: {successMessage},
});

export const updateToDoListFail = error => ({
  type: UPDATE_TODO_LIST_FAILURE,
  payload: {error},
});

export const updateToDoList = (listID, updatedToDoList) => {
  return dispatch => {
    dispatch(updateToDoListBegin());

    return axios
      .post(`${url}/todolist/update/${listID}`, {name: updatedToDoList})
      .then(response => response.data)
      .then(successMessage => dispatch(updateToDoListSuccess(successMessage)))
      .catch(error => dispatch(updateToDoListFail(error)));
  };
};
