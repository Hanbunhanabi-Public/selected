import axios from 'axios';

export const DELETE_TODO_LIST_BEGIN = 'DELETE_TODO_LIST_BEGIN';
export const DELETE_TODO_LIST_SUCCESS = 'DELETE_TODO_LIST_SUCCESS';
export const DELETE_TODO_LIST_FAILURE = 'DELETE_TODO_LIST_FAILURE';

export const deleteToDoListBegin = () => ({
  type: DELETE_TODO_LIST_BEGIN,
});

export const deleteToDoListSuccess = successMessage => ({
  type: DELETE_TODO_LIST_SUCCESS,
  payload: {successMessage},
});

export const deleteToDoListFail = error => ({
  type: DELETE_TODO_LIST_FAILURE,
  payload: {error},
});

export const deleteToDoList = listID => {
  return dispatch => {
    dispatch(deleteToDoListBegin());

    return axios
      .delete(`/todolist/${listID}`)
      .then(response => response.data)
      .then(successMessage => dispatch(deleteToDoListSuccess(successMessage)))
      .catch(error => dispatch(deleteToDoListFail(error)));
  };
};
