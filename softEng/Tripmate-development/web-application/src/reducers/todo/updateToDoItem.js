import {
  UPDATE_TODO_ITEM_BEGIN,
  UPDATE_TODO_ITEM_SUCCESS,
  UPDATE_TODO_ITEM_FAILURE,
} from '../../actions/todo/updateToDoItem';
import createReducer from '../createReducer';

const initialState = {
  updateSuccessMessage: null,
  updateLoading: true,
  updateError: null,
};

const updateToDoItemBeginState = state => ({
  ...state,
  updateLoading: true,
  updateError: null,
});

const updateToDoItemSuccessState = (state, action) => ({
  ...state,
  updateSuccessMessage: action.payload.successMessage,
  updateLoading: false,
});

const updateToDoItemFailureState = (state, action) => ({
  ...state,
  updateSuccessMessage: null,
  updateLoading: false,
  updateError: action.payload.error,
});

const updateToDoItem = createReducer(initialState, {
  [UPDATE_TODO_ITEM_BEGIN]: updateToDoItemBeginState,
  [UPDATE_TODO_ITEM_SUCCESS]: updateToDoItemSuccessState,
  [UPDATE_TODO_ITEM_FAILURE]: updateToDoItemFailureState,
});

export default updateToDoItem;
