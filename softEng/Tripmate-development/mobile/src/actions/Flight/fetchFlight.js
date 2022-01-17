import axios from 'axios';
import {url} from '../../utils/globalVars';

export const GET_FLIGHT_BEGIN = 'GET_FLIGHT_BEGIN';
export const GET_FLIGHT_SUCCESS = 'GET_FLIGHT_SUCCESS';
export const GET_FLIGHT_FAILURE = 'GET_FLIGHT_FAILURE';

export const fetchFlightBegin = () => ({
  type: GET_FLIGHT_BEGIN,
});

export const fetchFlightSuccess = flight => ({
  type: GET_FLIGHT_SUCCESS,
  payload: {flight},
});

export const fetchFlightError = error => ({
  type: GET_FLIGHT_FAILURE,
  payload: {error},
});

export const fetchFlight = tripId => {
  return dispatch => {
    dispatch(fetchFlightBegin());

    return axios
      .get(url + '/flight/trip/' + tripId)
      .then(response => response.data)
      .then(flight => dispatch(fetchFlightSuccess(flight)))
      .catch(error => dispatch(fetchFlightError(error)));
  };
};
