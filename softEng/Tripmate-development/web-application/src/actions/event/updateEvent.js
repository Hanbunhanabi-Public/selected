import axios from 'axios';

export const UPDATE_EVENT_BEGIN = 'UPDATE_EVENT_BEGIN';
export const UPDATE_EVENT_SUCCESS = 'UPDATE_EVENT_SUCCESS';
export const UPDATE_EVENT_FAILURE = 'UPDATE_EVENT_FAILURE';

export const updateEventBegin = () => ({
  type: UPDATE_EVENT_BEGIN,
});

export const updateEventSuccess = successMessage => ({
  type: UPDATE_EVENT_SUCCESS,
  payload: {successMessage},
});

export const updateEventFail = error => ({
  type: UPDATE_EVENT_FAILURE,
  payload: {error},
});

// Unfortunately, this implementation forces you input
// all event params even if you just want to change the title.
export const updateEvent = (
  eventID,
  eventTitle,
  description,
  startDate,
  endDate,
  location,
  cost,
) => {
  return dispatch => {
    dispatch(updateEventBegin());

    return axios
      .post(`/event/update/${eventID}`, {
        title: eventTitle,
        description,
        start: startDate,
        endDate,
        location,
        cost,
      })
      .then(response => response.data)
      .then(successMessage => dispatch(updateEventSuccess(successMessage)))
      .catch(error => dispatch(updateEventFail(error)));
  };
};
