import axios from 'axios';
import {url} from '../../utils/globalVars';

export const DELETE_TRIP_BEGIN = 'DELETE_TRIP_BEGIN';
export const DELETE_TRIP_SUCCESS = 'DELETE_TRIP_SUCCESS';
export const DELETE_TRIP_FAILURE = 'DELETE_TRIP_FAILURE';

export const deleteTripBegin = () => ({
  type: DELETE_TRIP_BEGIN,
});

export const deleteTripSuccess = deleteSuccessMessage => ({
  type: DELETE_TRIP_SUCCESS,
  payload: {deleteSuccessMessage},
});

export const deleteTripFail = error => ({
  type: DELETE_TRIP_FAILURE,
  payload: {error},
});

export const deleteTrip = tripId => {
  return dispatch => {
    dispatch(deleteTripBegin());

    return axios
      .delete(url + '/trip/' + tripId)
      .then(response => response.data)
      .then(deleteSuccessMessage =>
        dispatch(deleteTripSuccess(deleteSuccessMessage)),
      )
      .catch(error => dispatch(deleteTripFail(error)));
  };
};
