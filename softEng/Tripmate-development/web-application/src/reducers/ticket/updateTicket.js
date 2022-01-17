import {
  UPDATE_TICKET_BEGIN,
  UPDATE_TICKET_SUCCESS,
  UPDATE_TICKET_FAILURE,
} from '../../actions/ticket/updateTicket';
import createReducer from '../createReducer';

const initialState = {
  updateSuccessMessage: null,
  updateLoading: true,
  updateError: null,
};

const updateTicketBeginState = state => ({
  ...state,
  updateLoading: true,
  updateError: null,
});

const updateTicketSuccessState = (state, action) => ({
  ...state,
  updateSuccessMessage: action.payload.successMessage,
  updateLoading: false,
});

const updateTicketFailureState = (state, action) => ({
  ...state,
  updateSuccessMessage: null,
  updateLoading: false,
  updateError: action.payload.error,
});

const updateTicket = createReducer(initialState, {
  [UPDATE_TICKET_BEGIN]: updateTicketBeginState,
  [UPDATE_TICKET_SUCCESS]: updateTicketSuccessState,
  [UPDATE_TICKET_FAILURE]: updateTicketFailureState,
});

export default updateTicket;
