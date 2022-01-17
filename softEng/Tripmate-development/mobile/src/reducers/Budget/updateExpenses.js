import {
  UPDATE_EXPENSES_BEGIN,
  UPDATE_EXPENSES_FAILURE,
  UPDATE_EXPENSES_SUCCESS,
} from '../../actions/Budget/updateExpenses';
import createReducer from '../createReducer';
const initialState = {
  successMessage: '',
  uploading: false,
  error: null,
};

const updateExpensesBeginState = state => ({
  ...state,
  uploading: true,
  error: null,
});

const updateExpensesSuccessState = (state, action) => ({
  ...state,
  uploading: false,
  successMessage: action.payload.data,
});

const updateExpensesFailureState = (state, action) => ({
  ...state,
  uploading: false,
  error: action.payload.error,
});
const updateExpenses = createReducer(initialState, {
  [UPDATE_EXPENSES_BEGIN]: updateExpensesBeginState,
  [UPDATE_EXPENSES_SUCCESS]: updateExpensesSuccessState,
  [UPDATE_EXPENSES_FAILURE]: updateExpensesFailureState,
});

export default updateExpenses;
