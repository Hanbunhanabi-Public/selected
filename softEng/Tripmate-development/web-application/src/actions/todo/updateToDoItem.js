import axios from 'axios';

export const UPDATE_TODO_ITEM_BEGIN = 'UPDATE_TODO_ITEM_BEGIN';
export const UPDATE_TODO_ITEM_SUCCESS = 'UPDATE_TODO_ITEM_SUCCESS';
export const UPDATE_TODO_ITEM_FAILURE = 'UPDATE_TODO_ITEM_FAILURE';

export const updateToDoItemBegin = () => ({
  type: UPDATE_TODO_ITEM_BEGIN,
});

export const updateToDoItemSuccess = successMessage => ({
  type: UPDATE_TODO_ITEM_SUCCESS,
  payload: {successMessage},
});

export const updateToDoItemFail = error => ({
  type: UPDATE_TODO_ITEM_FAILURE,
  payload: {error},
});

export const updateToDoItem = (
  listID,
  itemID,
  updatedToDoItemContent,
  updatedToDoItemStatus,
) => {
  return dispatch => {
    dispatch(updateToDoItemBegin());

    return axios
      .post(`/todolist/${listID}/todoitem/update/${itemID}`, {
        content: updatedToDoItemContent,
        done: updatedToDoItemStatus,
      })
      .then(response => response.data)
      .then(successMessage => dispatch(updateToDoItemSuccess(successMessage)))
      .catch(error => dispatch(updateToDoItemFail(error)));
  };
};
