import axios from 'axios';
import {url} from '../../utils/globalVars';

export const GET_TICKET_BEGIN = 'GET_TICKET_BEGIN';
export const GET_TICKET_SUCCESS = 'GET_TICKET_SUCCESS';
export const GET_TICKET_FAILURE = 'GET_TICKET_FAILURE';

export const fetchTicketBegin = () => ({
  type: GET_TICKET_BEGIN,
});

export const fetchTicketSuccess = ticket => ({
  type: GET_TICKET_SUCCESS,
  payload: {ticket},
});

export const fetchTicketError = error => ({
  type: GET_TICKET_FAILURE,
  payload: {error},
});

export const fetchTicket = tripId => {
  return dispatch => {
    dispatch(fetchTicketBegin());

    return axios
      .get(url + '/ticket/trip/' + tripId)
      .then(response => response.data)
      .then(ticket => dispatch(fetchTicketSuccess(ticket)))
      .catch(error => dispatch(fetchTicketError(error)));
  };
};
