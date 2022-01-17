import {
  DELETE_EVENT_BEGIN,
  DELETE_EVENT_SUCCESS,
  DELETE_EVENT_FAILURE,
} from '../../actions/event/deleteEvent';
import createReducer from '../createReducer';

const initialState = {
  deleteSuccessMessage: null,
  deleteLoading: true,
  deleteError: null,
};

const deleteEventBeginState = state => ({
  ...state,
  deleteLoading: true,
  deleteError: null,
});

const deleteEventSuccessState = (state, action) => ({
  ...state,
  deleteSuccessMessage: action.payload.successMessage,
  deleteLoading: false,
});

const deleteEventFailureState = (state, action) => ({
  ...state,
  deleteSuccessMessage: null,
  deleteLoading: false,
  deleteError: action.payload.error,
});

const deleteEvent = createReducer(initialState, {
  [DELETE_EVENT_BEGIN]: deleteEventBeginState,
  [DELETE_EVENT_SUCCESS]: deleteEventSuccessState,
  [DELETE_EVENT_FAILURE]: deleteEventFailureState,
});

export default deleteEvent;
