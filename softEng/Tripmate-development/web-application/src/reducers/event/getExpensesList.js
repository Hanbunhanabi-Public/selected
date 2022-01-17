import {
  GET_EXPENSES_LIST_BEGIN,
  GET_EXPENSES_LIST_SUCCESS,
  GET_EXPENSES_LIST_FAILURE,
} from '../../actions/expense/fetchExpensesList';

import createReducer from '../createReducer';

const initialState = {
  expensesList: [],
  loading: true,
  error: null,
};

const getExpensesListBeginState = state => ({
  ...state,
  loading: true,
  error: null,
});

const getExpensesListSuccessState = (state, action) => ({
  ...state,
  loading: false,
  expensesList: action.payload.expensesList,
});

const getExpensesListFailureState = (state, action) => ({
  ...state,
  expensesList: [],
  loading: false,
  error: action.payload.error,
});
const getExpensesList = createReducer(initialState, {
  [GET_EXPENSES_LIST_BEGIN]: getExpensesListBeginState,
  [GET_EXPENSES_LIST_SUCCESS]: getExpensesListSuccessState,
  [GET_EXPENSES_LIST_FAILURE]: getExpensesListFailureState,
});

export default getExpensesList;
