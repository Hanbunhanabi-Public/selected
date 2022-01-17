import axios from 'axios';

export const UPDATE_TRIP_BEGIN = 'UPDATE_TRIP_BEGIN';
export const UPDATE_TRIP_SUCCESS = 'UPDATE_TRIP_SUCCESS';
export const UPDATE_TRIP_FAILURE = 'UPDATE_TRIP_FAILURE';

export const updateTripBegin = () => ({
  type: UPDATE_TRIP_BEGIN,
});

export const updateTripSuccess = successMessage => ({
  type: UPDATE_TRIP_SUCCESS,
  payload: {successMessage},
});

export const updateTripFail = error => ({
  type: UPDATE_TRIP_FAILURE,
  payload: {error},
});

export const updateTrip = (
  tripId,
  tripname,
  description,
  startDate,
  endDate,
) => {
  return dispatch => {
    dispatch(updateTripBegin());

    return axios
      .post(`/trip/update/${tripId}`, {
        tripname,
        description,
        startDate,
        endDate,
      })
      .then(response => response.data)
      .then(successMessage => dispatch(updateTripSuccess(successMessage)))
      .catch(error => dispatch(updateTripFail(error)));
  };
};
