import {
  CREATE_TODO_LIST_BEGIN,
  CREATE_TODO_LIST_SUCCESS,
  CREATE_TODO_LIST_FAILURE,
} from '../../actions/Todo/createToDoList';
import createReducer from '../createReducer';

const initialState = {
  createSuccessMessage: null,
  createLoading: false,
  createError: null,
};

const createToDoListBeginState = state => ({
  ...state,
  createLoading: true,
  createError: null,
});

const createToDoListSuccessState = (state, action) => ({
  ...state,
  createSuccessMessage: action.payload.successMessage,
  createLoading: false,
});

const createToDoListFailureState = (state, action) => ({
  ...state,
  createSuccessMessage: null,
  createLoading: false,
  createError: action.payload.error,
});

const createToDoList = createReducer(initialState, {
  [CREATE_TODO_LIST_BEGIN]: createToDoListBeginState,
  [CREATE_TODO_LIST_SUCCESS]: createToDoListSuccessState,
  [CREATE_TODO_LIST_FAILURE]: createToDoListFailureState,
});

export default createToDoList;
