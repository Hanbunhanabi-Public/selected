import {
  DELETE_TODO_ITEM_BEGIN,
  DELETE_TODO_ITEM_SUCCESS,
  DELETE_TODO_ITEM_FAILURE,
} from '../../actions/todo/deleteToDoItem';
import createReducer from '../createReducer';

const initialState = {
  deleteSuccessMessage: null,
  deleteLoading: true,
  deleteError: null,
};

const deleteToDoItemBeginState = state => ({
  ...state,
  deleteLoading: true,
  deleteError: null,
});

const deleteToDoItemSuccessState = (state, action) => ({
  ...state,
  deleteSuccessMessage: action.payload.successMessage,
  deleteLoading: false,
});

const deleteToDoItemFailureState = (state, action) => ({
  ...state,
  deleteSuccessMessage: null,
  deleteLoading: false,
  deleteError: action.payload.error,
});

const deleteToDoItem = createReducer(initialState, {
  [DELETE_TODO_ITEM_BEGIN]: deleteToDoItemBeginState,
  [DELETE_TODO_ITEM_SUCCESS]: deleteToDoItemSuccessState,
  [DELETE_TODO_ITEM_FAILURE]: deleteToDoItemFailureState,
});

export default deleteToDoItem;
