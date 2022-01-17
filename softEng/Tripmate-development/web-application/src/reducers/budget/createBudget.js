import {
  CREATE_BUDGET_BEGIN,
  CREATE_BUDGET_SUCCESS,
  CREATE_BUDGET_FAILURE,
} from '../../actions/budget/createBudget';
import createReducer from '../createReducer';

const initialState = {
  createSuccessMessage: [],
  createLoading: true,
  createError: null,
};

const createBudgetBeginState = state => ({
  ...state,
  createLoading: true,
  createError: null,
});

const createBudgetSuccessState = (state, action) => ({
  ...state,
  createSuccessMessage: action.payload.successMessage,
  createLoading: false,
});

const createBudgetFailureState = (state, action) => ({
  ...state,
  createSuccessMessage: [],
  createLoading: false,
  createError: action.payload.error,
});

const createBudget = createReducer(initialState, {
  [CREATE_BUDGET_BEGIN]: createBudgetBeginState,
  [CREATE_BUDGET_SUCCESS]: createBudgetSuccessState,
  [CREATE_BUDGET_FAILURE]: createBudgetFailureState,
});

export default createBudget;
