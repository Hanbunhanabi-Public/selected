import {
  ADD_EXPENSES_BEGIN,
  ADD_EXPENSES_SUCCESS,
  ADD_EXPENSES_FAILURE,
} from '../../actions/Budget/addExpenses';
import createReducer from '../createReducer';
const initialState = {
  successMessage: '',
  uploading: false,
  error: null,
};

const addExpensesBeginState = state => ({
  ...state,
  uploading: true,
  error: null,
});

const addExpensesSuccessState = (state, action) => ({
  ...state,
  uploading: false,
  successMessage: action.payload.data,
});

const addExpensesFailureState = (state, action) => ({
  ...state,
  uploading: false,
  error: action.payload.error,
});
const addExpenses = createReducer(initialState, {
  [ADD_EXPENSES_BEGIN]: addExpensesBeginState,
  [ADD_EXPENSES_SUCCESS]: addExpensesSuccessState,
  [ADD_EXPENSES_FAILURE]: addExpensesFailureState,
});

export default addExpenses;
