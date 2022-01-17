import axios from 'axios';

export const CREATE_EVENT_BEGIN = 'CREATE_EVENT_BEGIN';
export const CREATE_EVENT_SUCCESS = 'CREATE_EVENT_SUCCESS';
export const CREATE_EVENT_FAILURE = 'CREATE_EVENT_FAILURE';

export const createEventBegin = () => ({
  type: CREATE_EVENT_BEGIN,
});

export const createEventSuccess = successMessage => ({
  type: CREATE_EVENT_SUCCESS,
  payload: {successMessage},
});

export const createEventFail = error => ({
  type: CREATE_EVENT_FAILURE,
  payload: {error},
});

export const createEvent = (
  tripId,
  eventTitle,
  description,
  startDate,
  endDate,
  location,
  cost,
) => {
  return dispatch => {
    dispatch(createEventBegin());

    return axios
      .post(`/event/add/${tripId}`, {
        tripId,
        event: {
          title: eventTitle,
          description,
          start: startDate,
          end: endDate,
          location,
          cost,
        },
      })
      .then(response => response.data)
      .then(successMessage => dispatch(createEventSuccess(successMessage)))
      .catch(error => dispatch(createEventFail(error)));
  };
};
