const axios = require('axios');

export const GET_EVENT_BEGIN = 'GET_EVENT_BEGIN';
export const GET_EVENT_SUCCESS = 'GET_EVENT_SUCCESS';
export const GET_EVENT_FAILURE = 'GET_EVENT_FAILURE';

export const fetchEventBegin = () => ({
  type: GET_EVENT_BEGIN,
});

export const fetchEventSuccess = event => ({
  type: GET_EVENT_SUCCESS,
  payload: {event},
});

export const fetchEventError = error => ({
  type: GET_EVENT_FAILURE,
  payload: {error},
});

export const fetchEvent = tripId => {
  return dispatch => {
    dispatch(fetchEventBegin());

    return axios
      .get(`/event/trip/${tripId}`)
      .then(response => response.data)
      .then(event => dispatch(fetchEventSuccess(event)))
      .catch(error => dispatch(fetchEventError(error)));
  };
};
