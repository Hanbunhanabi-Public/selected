import {
  UPDATE_TODO_LIST_BEGIN,
  UPDATE_TODO_LIST_SUCCESS,
  UPDATE_TODO_LIST_FAILURE,
} from '../../actions/todo/updateToDoList';
import createReducer from '../createReducer';

const initialState = {
  updateSuccessMessage: null,
  updateLoading: true,
  updateError: null,
};

const updateToDoListBeginState = state => ({
  ...state,
  updateLoading: true,
  updateError: null,
});

const updateToDoListSuccessState = (state, action) => ({
  ...state,
  updateSuccessMessage: action.payload.successMessage,
  updateLoading: false,
});

const updateToDoListFailureState = (state, action) => ({
  ...state,
  updateSuccessMessage: null,
  updateLoading: false,
  updateError: action.payload.error,
});

const updateToDoList = createReducer(initialState, {
  [UPDATE_TODO_LIST_BEGIN]: updateToDoListBeginState,
  [UPDATE_TODO_LIST_SUCCESS]: updateToDoListSuccessState,
  [UPDATE_TODO_LIST_FAILURE]: updateToDoListFailureState,
});

export default updateToDoList;
