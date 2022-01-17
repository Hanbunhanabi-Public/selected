import {
  CREATE_FLIGHT_BEGIN,
  CREATE_FLIGHT_SUCCESS,
  CREATE_FLIGHT_FAILURE,
} from '../../actions/flight/createFlight';
import createReducer from '../createReducer';

const initialState = {
  createSuccessMessage: null,
  createLoading: false,
  createError: null,
};

const createFlightBeginState = state => ({
  ...state,
  createLoading: true,
  createError: null,
});

const createFlightSuccessState = (state, action) => ({
  ...state,
  createSuccessMessage: action.payload.successMessage,
  createLoading: false,
});

const createFlightFailureState = (state, action) => ({
  ...state,
  createSuccessMessage: null,
  createLoading: false,
  createError: action.payload.error,
});

const createFlight = createReducer(initialState, {
  [CREATE_FLIGHT_BEGIN]: createFlightBeginState,
  [CREATE_FLIGHT_SUCCESS]: createFlightSuccessState,
  [CREATE_FLIGHT_FAILURE]: createFlightFailureState,
});

export default createFlight;
