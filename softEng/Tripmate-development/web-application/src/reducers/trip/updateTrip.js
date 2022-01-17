import {
  UPDATE_TRIP_BEGIN,
  UPDATE_TRIP_FAILURE,
  UPDATE_TRIP_SUCCESS,
} from '../../actions/trip/updateTrip';
import createReducer from '../createReducer';

const initialState = {
  successMessage: '',
  uploading: true,
  error: null,
};

const updateTripBeginState = state => ({
  ...state,
  uploading: true,
  error: null,
});

const updateTripSuccessState = (state, action) => ({
  ...state,
  uploading: false,
  successMessage: action.payload.data,
});

const updateTripFailureState = (state, action) => ({
  ...state,
  uploading: false,
  error: action.payload.error,
});
const updateTrip = createReducer(initialState, {
  [UPDATE_TRIP_BEGIN]: updateTripBeginState,
  [UPDATE_TRIP_SUCCESS]: updateTripSuccessState,
  [UPDATE_TRIP_FAILURE]: updateTripFailureState,
});

export default updateTrip;
