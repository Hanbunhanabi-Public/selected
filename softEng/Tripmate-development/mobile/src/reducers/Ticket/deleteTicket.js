import {
  DELETE_TICKET_BEGIN,
  DELETE_TICKET_SUCCESS,
  DELETE_TICKET_FAILURE,
} from '../../actions/Ticket/deleteTicket';
import createReducer from '../createReducer';

const initialState = {
  deleteSuccessMessage: null,
  deleteLoading: false,
  deleteError: null,
};

const deleteTicketBeginState = state => ({
  ...state,
  deleteLoading: true,
  deleteError: null,
});

const deleteTicketSuccessState = (state, action) => ({
  ...state,
  deleteSuccessMessage: action.payload.successMessage,
  deleteLoading: false,
});

const deleteTicketFailureState = (state, action) => ({
  ...state,
  deleteSuccessMessage: null,
  deleteLoading: false,
  deleteError: action.payload.error,
});

const deleteTicket = createReducer(initialState, {
  [DELETE_TICKET_BEGIN]: deleteTicketBeginState,
  [DELETE_TICKET_SUCCESS]: deleteTicketSuccessState,
  [DELETE_TICKET_FAILURE]: deleteTicketFailureState,
});

export default deleteTicket;
