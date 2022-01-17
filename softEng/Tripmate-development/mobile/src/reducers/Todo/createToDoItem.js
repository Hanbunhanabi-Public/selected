import {
  CREATE_TODO_ITEM_BEGIN,
  CREATE_TODO_ITEM_SUCCESS,
  CREATE_TODO_ITEM_FAILURE,
} from '../../actions/Todo/createToDoItem';
import createReducer from '../createReducer';

const initialState = {
  createSuccessMessage: null,
  createLoading: false,
  createError: null,
};

const createToDoItemBeginState = state => ({
  ...state,
  createLoading: true,
  createError: null,
});

const createToDoItemSuccessState = (state, action) => ({
  ...state,
  createSuccessMessage: action.payload.successMessage,
  createLoading: false,
});

const createToDoItemFailureState = (state, action) => ({
  ...state,
  createSuccessMessage: null,
  createLoading: false,
  createError: action.payload.error,
});

const createToDoItem = createReducer(initialState, {
  [CREATE_TODO_ITEM_BEGIN]: createToDoItemBeginState,
  [CREATE_TODO_ITEM_SUCCESS]: createToDoItemSuccessState,
  [CREATE_TODO_ITEM_FAILURE]: createToDoItemFailureState,
});

export default createToDoItem;
