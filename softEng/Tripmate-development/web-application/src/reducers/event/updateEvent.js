import {
  UPDATE_EVENT_BEGIN,
  UPDATE_EVENT_SUCCESS,
  UPDATE_EVENT_FAILURE,
} from '../../actions/event/updateEvent';
import createReducer from '../createReducer';

const initialState = {
  updateSuccessMessage: null,
  updateLoading: true,
  updateError: null,
};

const updateEventBeginState = state => ({
  ...state,
  updateLoading: true,
  updateError: null,
});

const updateEventSuccessState = (state, action) => ({
  ...state,
  event: action.payload.event,
  updateSuccessMessage: action.payload.successMessage,
  updateLoading: false,
});

const updateEventFailureState = (state, action) => ({
  ...state,
  updateSuccessMessage: null,
  updateLoading: false,
  updateError: action.payload.error,
});

const updateEvent = createReducer(initialState, {
  [UPDATE_EVENT_BEGIN]: updateEventBeginState,
  [UPDATE_EVENT_SUCCESS]: updateEventSuccessState,
  [UPDATE_EVENT_FAILURE]: updateEventFailureState,
});

export default updateEvent;
