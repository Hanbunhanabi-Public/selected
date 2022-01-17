import axios from 'axios';
import {url} from '../../utils/globalVars';

export const CREATE_TRIP_BEGIN = 'CREATE_TRIP_BEGIN';
export const CREATE_TRIP_SUCCESS = 'CREATE_TRIP_SUCCESS';
export const CREATE_TRIP_FAILURE = 'CREATE_TRIP_FAILURE';

export const createTripBegin = () => ({
  type: CREATE_TRIP_BEGIN,
});

export const createTripSuccess = successMessage => ({
  type: CREATE_TRIP_SUCCESS,
  payload: {successMessage},
});

export const createTripFail = error => ({
  type: CREATE_TRIP_FAILURE,
  payload: {error},
});

export const createTrip = (
  userId,
  tripname,
  description,
  startDate,
  endDate,
  budget,
) => {
  return dispatch => {
    dispatch(createTripBegin());

    return axios
      .post(url + '/trip/add/' + userId, {
        tripname,
        description,
        startDate,
        endDate,
        budget,
      })
      .then(response => response.data)
      .then(successMessage => dispatch(createTripSuccess(successMessage)))
      .catch(error => dispatch(createTripFail(error)));
  };
};
