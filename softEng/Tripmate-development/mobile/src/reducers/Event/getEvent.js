import {
  GET_EVENT_BEGIN,
  GET_EVENT_SUCCESS,
  GET_EVENT_FAILURE,
} from '../../actions/Event/fetchEvent';
import createReducer from '../createReducer';

const initialState = {
  event: [],
  loading: false,
  error: null,
};

const eventBeginState = state => ({
  ...state,
  loading: true,
  error: null,
});

const eventSuccessState = (state, action) => ({
  ...state,
  event: action.payload.event,
  loading: false,
});

const eventFailureState = (state, action) => ({
  ...state,
  event: [],
  loading: false,
  error: action.payload.error,
});

const getEvent = createReducer(initialState, {
  [GET_EVENT_BEGIN]: eventBeginState,
  [GET_EVENT_SUCCESS]: eventSuccessState,
  [GET_EVENT_FAILURE]: eventFailureState,
});

export default getEvent;
