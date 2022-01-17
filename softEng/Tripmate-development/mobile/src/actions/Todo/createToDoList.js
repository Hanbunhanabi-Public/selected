import axios from 'axios';
import {url} from '../../utils/globalVars';

export const CREATE_TODO_LIST_BEGIN = 'CREATE_TODO_LIST_BEGIN';
export const CREATE_TODO_LIST_SUCCESS = 'CREATE_TODO_LIST_SUCCESS';
export const CREATE_TODO_LIST_FAILURE = 'CREATE_TODO_LIST_FAILURE';

export const createToDoListBegin = () => ({
  type: CREATE_TODO_LIST_BEGIN,
});

export const createToDoListSuccess = successMessage => ({
  type: CREATE_TODO_LIST_SUCCESS,
  payload: {successMessage},
});

export const createToDoListFail = error => ({
  type: CREATE_TODO_LIST_FAILURE,
  payload: {error},
});

export const createToDoList = (tripId, newToDoList) => {
  return dispatch => {
    dispatch(createToDoListBegin());

    return axios
      .post(url + '/todolist/add/' + tripId, {name: newToDoList})
      .then(response => response.data)
      .then(successMessage => dispatch(createToDoListSuccess(successMessage)))
      .catch(error => dispatch(createToDoListFail(error)));
  };
};
