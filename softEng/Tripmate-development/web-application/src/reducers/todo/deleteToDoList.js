import {
  DELETE_TODO_LIST_BEGIN,
  DELETE_TODO_LIST_SUCCESS,
  DELETE_TODO_LIST_FAILURE,
} from '../../actions/todo/deleteToDoList';
import createReducer from '../createReducer';

const initialState = {
  deleteSuccessMessage: null,
  deleteLoading: true,
  deleteError: null,
};

const deleteToDoListBeginState = state => ({
  ...state,
  deleteLoading: true,
  deleteError: null,
});

const deleteToDoListSuccessState = (state, action) => ({
  ...state,
  deleteSuccessMessage: action.payload.successMessage,
  deleteLoading: false,
});

const deleteToDoListFailureState = (state, action) => ({
  ...state,
  deleteSuccessMessage: null,
  deleteLoading: false,
  deleteError: action.payload.error,
});

const deleteToDoList = createReducer(initialState, {
  [DELETE_TODO_LIST_BEGIN]: deleteToDoListBeginState,
  [DELETE_TODO_LIST_SUCCESS]: deleteToDoListSuccessState,
  [DELETE_TODO_LIST_FAILURE]: deleteToDoListFailureState,
});

export default deleteToDoList;
