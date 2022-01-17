import axios from 'axios';
import {url} from '../../utils/globalVars';

export const CREATE_TODO_ITEM_BEGIN = 'CREATE_TODO_ITEM_BEGIN';
export const CREATE_TODO_ITEM_SUCCESS = 'CREATE_TODO_ITEM_SUCCESS';
export const CREATE_TODO_ITEM_FAILURE = 'CREATE_TODO_ITEM_FAILURE';

export const createToDoItemBegin = () => ({
  type: CREATE_TODO_ITEM_BEGIN,
});

export const createToDoItemSuccess = successMessage => ({
  type: CREATE_TODO_ITEM_SUCCESS,
  payload: {successMessage},
});

export const createToDoItemFail = error => ({
  type: CREATE_TODO_ITEM_FAILURE,
  payload: {error},
});

export const createToDoItem = (listID, newToDoItem) => {
  return dispatch => {
    dispatch(createToDoItemBegin());

    return axios
      .post(`${url}/todolist/${listID}/todoitem/add`, {content: newToDoItem})
      .then(response => response.data)
      .then(successMessage => dispatch(createToDoItemSuccess(successMessage)))
      .catch(error => dispatch(createToDoItemFail(error)));
  };
};
