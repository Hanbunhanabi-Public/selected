import {
  CREATE_EVENT_BEGIN,
  CREATE_EVENT_SUCCESS,
  CREATE_EVENT_FAILURE,
} from '../../actions/Event/createEvent';
import createReducer from '../createReducer';

const initialState = {
  createSuccessMessage: null,
  createLoading: false,
  createError: null,
};

const createEventBeginState = state => ({
  ...state,
  createLoading: true,
  createError: null,
});

const createEventSuccessState = (state, action) => ({
  ...state,
  createSuccessMessage: action.payload.successMessage,
  createLoading: false,
});

const createEventFailureState = (state, action) => ({
  ...state,
  createSuccessMessage: null,
  createLoading: false,
  createError: action.payload.error,
});

const createEvent = createReducer(initialState, {
  [CREATE_EVENT_BEGIN]: createEventBeginState,
  [CREATE_EVENT_SUCCESS]: createEventSuccessState,
  [CREATE_EVENT_FAILURE]: createEventFailureState,
});

export default createEvent;
