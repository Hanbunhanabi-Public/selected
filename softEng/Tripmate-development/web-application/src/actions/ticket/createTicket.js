import axios from 'axios';

export const CREATE_TICKET_BEGIN = 'CREATE_TICKET_BEGIN';
export const CREATE_TICKET_SUCCESS = 'CREATE_TICKET_SUCCESS';
export const CREATE_TICKET_FAILURE = 'CREATE_TICKET_FAILURE';

export const createTicketBegin = () => ({
  type: CREATE_TICKET_BEGIN,
});

export const createTicketSuccess = successMessage => ({
  type: CREATE_TICKET_SUCCESS,
  payload: {successMessage},
});

export const createTicketFail = error => ({
  type: CREATE_TICKET_FAILURE,
  payload: {error},
});

export const createTicket = (
  tripId,
  transportType,
  startLocation,
  startDate,
  endLocation,
  endDate,
  confirmationNumber,
  notes,
) => {
  return dispatch => {
    dispatch(createTicketBegin());

    return axios
      .post(`/ticket/add/${tripId}`, {
        transportType,
        start: {
          location: startLocation,
          date: startDate,
        },
        end: {
          location: endLocation,
          date: endDate,
        },
        confirmationNumber,
        notes,
      })
      .then(response => response.data)
      .then(successMessage => dispatch(createTicketSuccess(successMessage)))
      .catch(error => dispatch(createTicketFail(error)));
  };
};
