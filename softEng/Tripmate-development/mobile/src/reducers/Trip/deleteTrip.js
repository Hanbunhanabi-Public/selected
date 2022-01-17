import {
  DELETE_TRIP_BEGIN,
  DELETE_TRIP_FAILURE,
  DELETE_TRIP_SUCCESS,
} from '../../actions/Trip/deleteTrip';
import createReducer from '../createReducer';

const initialState = {
  deleteMessage: '',
  deleting: true,
  error: null,
};

const deleteTripBeginState = state => ({
  ...state,
  deleting: true,
  error: null,
});

const deleteTripSuccessState = (state, action) => ({
  ...state,
  deleting: false,
  deleteMessage: action.payload.data,
});

const deleteTripFailureState = (state, action) => ({
  ...state,
  deleting: false,
  error: action.payload.error,
});
const deleteTrip = createReducer(initialState, {
  [DELETE_TRIP_BEGIN]: deleteTripBeginState,
  [DELETE_TRIP_SUCCESS]: deleteTripSuccessState,
  [DELETE_TRIP_FAILURE]: deleteTripFailureState,
});

export default deleteTrip;
