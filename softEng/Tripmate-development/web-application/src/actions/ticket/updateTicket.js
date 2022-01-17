import axios from 'axios';

export const UPDATE_TICKET_BEGIN = 'UPDATE_TICKET_BEGIN';
export const UPDATE_TICKET_SUCCESS = 'UPDATE_TICKET_SUCCESS';
export const UPDATE_TICKET_FAILURE = 'UPDATE_TICKET_FAILURE';

export const updateTicketBegin = () => ({
  type: UPDATE_TICKET_BEGIN,
});

export const updateTicketSuccess = successMessage => ({
  type: UPDATE_TICKET_SUCCESS,
  payload: {successMessage},
});

export const updateTicketFail = error => ({
  type: UPDATE_TICKET_FAILURE,
  payload: {error},
});

export const updateTicket = (
  ticketID,
  transportType,
  startLocation,
  startDate,
  endLocation,
  endDate,
  confirmationNumber,
  notes,
) => {
  return dispatch => {
    dispatch(updateTicketBegin());

    return axios
      .post(`/ticket/update/${ticketID}`, {
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
      .then(successMessage => dispatch(updateTicketSuccess(successMessage)))
      .catch(error => dispatch(updateTicketFail(error)));
  };
};
