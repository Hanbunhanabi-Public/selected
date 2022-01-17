import {
  GET_EXPENSES_BEGIN,
  GET_EXPENSES_SUCCESS,
  GET_EXPENSES_FAILURE,
} from '../../actions/Budget/fetchExpenses';

import createReducer from '../createReducer';
const initialState = {
  expenses: {},
  loading: false,
  error: null,
};

const getExpensesBeginState = state => ({
  ...state,
  loading: true,
  error: null,
});

const getExpensesSuccessState = (state, action) => ({
  ...state,
  loading: false,
  expenses: action.payload.expenses,
});

const getExpensesFailureState = (state, action) => ({
  ...state,
  expenses: {},
  loading: false,
  error: action.payload.error,
});
const getExpenses = createReducer(initialState, {
  [GET_EXPENSES_BEGIN]: getExpensesBeginState,
  [GET_EXPENSES_SUCCESS]: getExpensesSuccessState,
  [GET_EXPENSES_FAILURE]: getExpensesFailureState,
});

export default getExpenses;
