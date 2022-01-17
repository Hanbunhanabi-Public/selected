import {
  GET_FLIGHT_BEGIN,
  GET_FLIGHT_SUCCESS,
  GET_FLIGHT_FAILURE,
} from '../../actions/flight/fetchFlight';
import createReducer from '../createReducer';

const initialState = {
  flight: [],
  loading: true,
  error: null,
};

const flightBeginState = state => ({
  ...state,
  loading: true,
  error: null,
});

const flightSuccessState = (state, action) => ({
  ...state,
  flight: action.payload.flight,
  loading: false,
});

const flightFailureState = (state, action) => ({
  ...state,
  flight: [],
  loading: false,
  error: action.payload.error,
});

const getFlight = createReducer(initialState, {
  [GET_FLIGHT_BEGIN]: flightBeginState,
  [GET_FLIGHT_SUCCESS]: flightSuccessState,
  [GET_FLIGHT_FAILURE]: flightFailureState,
});

export default getFlight;
