import {
  GET_TICKET_BEGIN,
  GET_TICKET_SUCCESS,
  GET_TICKET_FAILURE,
} from '../../actions/Ticket/fetchTicket';
import createReducer from '../createReducer';

const initialState = {
  ticket: [],
  loading: false,
  error: null,
};

const ticketBeginState = state => ({
  ...state,
  loading: true,
  error: null,
});

const ticketSuccessState = (state, action) => ({
  ...state,
  ticket: action.payload.ticket,
  loading: false,
});

const ticketFailureState = (state, action) => ({
  ...state,
  ticket: [],
  loading: false,
  error: action.payload.error,
});

const getTicket = createReducer(initialState, {
  [GET_TICKET_BEGIN]: ticketBeginState,
  [GET_TICKET_SUCCESS]: ticketSuccessState,
  [GET_TICKET_FAILURE]: ticketFailureState,
});

export default getTicket;
