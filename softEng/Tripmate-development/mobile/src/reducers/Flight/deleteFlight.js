import {
  DELETE_FLIGHT_BEGIN,
  DELETE_FLIGHT_SUCCESS,
  DELETE_FLIGHT_FAILURE,
} from '../../actions/Flight/deleteFlight';
import createReducer from '../createReducer';

const initialState = {
  deleteSuccessMessage: null,
  deleteLoading: false,
  deleteError: null,
};

const deleteFlightBeginState = state => ({
  ...state,
  deleteLoading: true,
  deleteError: null,
});

const deleteFlightSuccessState = (state, action) => ({
  ...state,
  deleteSuccessMessage: action.payload.successMessage,
  deleteLoading: false,
});

const deleteFlightFailureState = (state, action) => ({
  ...state,
  deleteSuccessMessage: null,
  deleteLoading: false,
  deleteError: action.payload.error,
});

const deleteFlight = createReducer(initialState, {
  [DELETE_FLIGHT_BEGIN]: deleteFlightBeginState,
  [DELETE_FLIGHT_SUCCESS]: deleteFlightSuccessState,
  [DELETE_FLIGHT_FAILURE]: deleteFlightFailureState,
});

export default deleteFlight;
