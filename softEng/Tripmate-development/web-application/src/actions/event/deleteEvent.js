import axios from 'axios';

export const DELETE_EVENT_BEGIN = 'DELETE_EVENT_BEGIN';
export const DELETE_EVENT_SUCCESS = 'DELETE_EVENT_SUCCESS';
export const DELETE_EVENT_FAILURE = 'DELETE_EVENT_FAILURE';

export const deleteEventBegin = () => ({
  type: DELETE_EVENT_BEGIN,
});

export const deleteEventSuccess = successMessage => ({
  type: DELETE_EVENT_SUCCESS,
  payload: {successMessage},
});

export const deleteEventFail = error => ({
  type: DELETE_EVENT_FAILURE,
  payload: {error},
});

export const deleteEvent = eventID => {
  return dispatch => {
    dispatch(deleteEventBegin());

    return axios
      .delete(`/event/${eventID}`)
      .then(response => response.data)
      .then(successMessage => dispatch(deleteEventSuccess(successMessage)))
      .catch(error => dispatch(deleteEventFail(error)));
  };
};
