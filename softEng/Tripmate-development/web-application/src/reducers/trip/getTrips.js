import {
  GET_TRIPS_BEGIN,
  GET_TRIPS_SUCCESS,
  GET_TRIPS_FAILURE,
} from '../../actions/trip/fetchTrips';

import createReducer from '../createReducer';

const initialState = {
  trips: {},
  loading: true,
  error: null,
};

const getTripsBeginState = state => ({
  ...state,
  loading: true,
  error: null,
});

const getTripsSuccessState = (state, action) => ({
  ...state,
  loading: false,
  trips: action.payload.trips,
});

const getTripsFailureState = (state, action) => ({
  ...state,
  trips: {},
  loading: false,
  error: action.payload.error,
});
const getTrips = createReducer(initialState, {
  [GET_TRIPS_BEGIN]: getTripsBeginState,
  [GET_TRIPS_SUCCESS]: getTripsSuccessState,
  [GET_TRIPS_FAILURE]: getTripsFailureState,
});

export default getTrips;
