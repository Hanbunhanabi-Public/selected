import axios from 'axios';
import {url} from '../../utils/globalVars';

export const DELETE_FLIGHT_BEGIN = 'DELETE_FLIGHT_BEGIN';
export const DELETE_FLIGHT_SUCCESS = 'DELETE_FLIGHT_SUCCESS';
export const DELETE_FLIGHT_FAILURE = 'DELETE_FLIGHT_FAILURE';

export const deleteFlightBegin = () => ({
  type: DELETE_FLIGHT_BEGIN,
});

export const deleteFlightSuccess = successMessage => ({
  type: DELETE_FLIGHT_SUCCESS,
  payload: {successMessage},
});

export const deleteFlightFail = error => ({
  type: DELETE_FLIGHT_FAILURE,
  payload: {error},
});

export const deleteFlight = flightID => {
  return dispatch => {
    dispatch(deleteFlightBegin());

    return axios
      .delete(`${url}/flight/${flightID}`)
      .then(response => response.data)
      .then(successMessage => dispatch(deleteFlightSuccess(successMessage)))
      .catch(error => dispatch(deleteFlightFail(error)));
  };
};
