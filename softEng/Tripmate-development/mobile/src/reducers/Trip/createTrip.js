import {
  CREATE_TRIP_BEGIN,
  CREATE_TRIP_FAILURE,
  CREATE_TRIP_SUCCESS,
} from '../../actions/Trip/createTrip';
import createReducer from '../createReducer';
const initialState = {
  successMessage: '',
  uploading: true,
  error: null,
};

const createTripBeginState = state => ({
  ...state,
  uploading: true,
  error: null,
});

const createTripSuccessState = (state, action) => ({
  ...state,
  uploading: false,
  successMessage: action.payload.data,
});

const createTripFailureState = (state, action) => ({
  ...state,
  uploading: false,
  error: action.payload.error,
});
const createTrip = createReducer(initialState, {
  [CREATE_TRIP_BEGIN]: createTripBeginState,
  [CREATE_TRIP_SUCCESS]: createTripSuccessState,
  [CREATE_TRIP_FAILURE]: createTripFailureState,
});

export default createTrip;
