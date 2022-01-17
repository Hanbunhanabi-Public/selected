import axios from 'axios';

export const DELETE_TICKET_BEGIN = 'DELETE_TICKET_BEGIN';
export const DELETE_TICKET_SUCCESS = 'DELETE_TICKET_SUCCESS';
export const DELETE_TICKET_FAILURE = 'DELETE_TICKET_FAILURE';

export const deleteTicketBegin = () => ({
  type: DELETE_TICKET_BEGIN,
});

export const deleteTicketSuccess = successMessage => ({
  type: DELETE_TICKET_SUCCESS,
  payload: {successMessage},
});

export const deleteTicketFail = error => ({
  type: DELETE_TICKET_FAILURE,
  payload: {error},
});

export const deleteTicket = ticketID => {
  return dispatch => {
    dispatch(deleteTicketBegin());

    return axios
      .delete(`/ticket/${ticketID}`)
      .then(response => response.data)
      .then(successMessage => dispatch(deleteTicketSuccess(successMessage)))
      .catch(error => dispatch(deleteTicketFail(error)));
  };
};
