import axios from 'axios';
import {url} from '../../utils/globalVars';

export const GET_TRIPS_BEGIN = 'GET_TRIPS_BEGIN';
export const GET_TRIPS_SUCCESS = 'GET_TRIPS_SUCCESS';
export const GET_TRIPS_FAILURE = 'GET_TRIPS_FAILURE';

export const fetchTripsBegin = () => ({
  type: GET_TRIPS_BEGIN,
});

export const fetchTripsSuccess = trips => ({
  type: GET_TRIPS_SUCCESS,
  payload: {trips},
});

export const fetchTripsFailure = error => ({
  type: GET_TRIPS_FAILURE,
  payload: {error},
});

export const fetchTrips = userId => {
  return dispatch => {
    dispatch(fetchTripsBegin());

    return axios
      .get(url + '/trip/user/' + userId)
      .then(response => response.data)
      .then(trips => dispatch(fetchTripsSuccess(trips)))
      .catch(error => dispatch(fetchTripsFailure(error)));
  };
};
