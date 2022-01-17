import {
  UPDATE_FLIGHT_BEGIN,
  UPDATE_FLIGHT_SUCCESS,
  UPDATE_FLIGHT_FAILURE,
} from '../../actions/flight/updateFlight';
import createReducer from '../createReducer';

const initialState = {
  updateSuccessMessage: null,
  updateLoading: true,
  updateError: null,
};

const updateFlightBeginState = state => ({
  ...state,
  updateLoading: true,
  updateError: null,
});

const updateFlightSuccessState = (state, action) => ({
  ...state,
  updateSuccessMessage: action.payload.successMessage,
  updateLoading: false,
});

const updateFlightFailureState = (state, action) => ({
  ...state,
  updateSuccessMessage: null,
  updateLoading: false,
  updateError: action.payload.error,
});

const updateFlight = createReducer(initialState, {
  [UPDATE_FLIGHT_BEGIN]: updateFlightBeginState,
  [UPDATE_FLIGHT_SUCCESS]: updateFlightSuccessState,
  [UPDATE_FLIGHT_FAILURE]: updateFlightFailureState,
});

export default updateFlight;
