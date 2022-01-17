import {
  CREATE_TICKET_BEGIN,
  CREATE_TICKET_SUCCESS,
  CREATE_TICKET_FAILURE,
} from '../../actions/Ticket/createTicket';
import createReducer from '../createReducer';

const initialState = {
  createSuccessMessage: null,
  createLoading: false,
  createError: null,
};

const createTicketBeginState = state => ({
  ...state,
  createLoading: true,
  createError: null,
});

const createTicketSuccessState = (state, action) => ({
  ...state,
  createSuccessMessage: action.payload.successMessage,
  createLoading: false,
});

const createTicketFailureState = (state, action) => ({
  ...state,
  createSuccessMessage: null,
  createLoading: false,
  createError: action.payload.error,
});

const createTicket = createReducer(initialState, {
  [CREATE_TICKET_BEGIN]: createTicketBeginState,
  [CREATE_TICKET_SUCCESS]: createTicketSuccessState,
  [CREATE_TICKET_FAILURE]: createTicketFailureState,
});

export default createTicket;
