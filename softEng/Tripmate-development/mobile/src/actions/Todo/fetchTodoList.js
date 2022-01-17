import axios from 'axios';
import {url} from '../../utils/globalVars';

export const GET_TODO_LIST_BEGIN = 'GET_TODO_LIST_BEGIN';
export const GET_TODO_LIST_SUCCESS = 'GET_TODO_LIST_SUCCESS';
export const GET_TODO_LIST_FAILURE = 'GET_TODO_LIST_FAILURE';

export const fetchToDoListBegin = () => ({
  type: GET_TODO_LIST_BEGIN,
});

export const fetchToDoListSuccess = todolist => ({
  type: GET_TODO_LIST_SUCCESS,
  payload: {todolist},
});

export const fetchToDoListError = error => ({
  type: GET_TODO_LIST_FAILURE,
  payload: {error},
});

export const fetchToDoList = tripId => {
  return dispatch => {
    dispatch(fetchToDoListBegin());

    return axios
      .get(url + '/todolist/trip/' + tripId)
      .then(response => response.data)
      .then(todolist => dispatch(fetchToDoListSuccess(todolist)))
      .catch(error => dispatch(fetchToDoListError(error)));
  };
};
