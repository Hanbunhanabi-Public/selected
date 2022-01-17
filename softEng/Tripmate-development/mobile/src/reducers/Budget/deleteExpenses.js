import {
  DELETE_EXPENSES_BEGIN,
  DELETE_EXPENSES_FAILURE,
  DELETE_EXPENSES_SUCCESS,
} from '../../actions/Budget/deleteExpenses';
import createReducer from '../createReducer';

const initialState = {
  deleteMessage: '',
  deleting: false,
  error: null,
};

const deleteExpensesBeginState = state => ({
  ...state,
  deleting: true,
  error: null,
});

const deleteExpensesSuccessState = (state, action) => ({
  ...state,
  deleting: false,
  deleteMessage: action.payload.data,
});

const deleteExpensesFailureState = (state, action) => ({
  ...state,
  deleting: false,
  error: action.payload.error,
});

const deleteExpenses = createReducer(initialState, {
  [DELETE_EXPENSES_BEGIN]: deleteExpensesBeginState,
  [DELETE_EXPENSES_SUCCESS]: deleteExpensesSuccessState,
  [DELETE_EXPENSES_FAILURE]: deleteExpensesFailureState,
});

export default deleteExpenses;
