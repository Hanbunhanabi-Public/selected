import axios from 'axios';
import {url} from '../../utils/globalVars';

export const DELETE_TODO_ITEM_BEGIN = 'DELETE_TODO_ITEM_BEGIN';
export const DELETE_TODO_ITEM_SUCCESS = 'DELETE_TODO_ITEM_SUCCESS';
export const DELETE_TODO_ITEM_FAILURE = 'DELETE_TODO_ITEM_FAILURE';

export const deleteToDoItemBegin = () => ({
  type: DELETE_TODO_ITEM_BEGIN,
});

export const deleteToDoItemSuccess = successMessage => ({
  type: DELETE_TODO_ITEM_SUCCESS,
  payload: {successMessage},
});

export const deleteToDoItemFail = error => ({
  type: DELETE_TODO_ITEM_FAILURE,
  payload: {error},
});

export const deleteToDoItem = (listID, itemID) => {
  return dispatch => {
    dispatch(deleteToDoItemBegin());

    return axios
      .delete(`${url}/todolist/${listID}/todoitem/${itemID}`)
      .then(response => response.data)
      .then(successMessage => dispatch(deleteToDoItemSuccess(successMessage)))
      .catch(error => dispatch(deleteToDoItemFail(error)));
  };
};
