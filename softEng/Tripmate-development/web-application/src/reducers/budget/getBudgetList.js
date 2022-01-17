import {
  GET_BUDGET_LIST_BEGIN,
  GET_BUDGET_LIST_SUCCESS,
  GET_BUDGET_LIST_FAILURE,
} from '../../actions/budget/fetchBudgetList';

import createReducer from '../createReducer';

const initialState = {
  budget: {},
  loading: true,
  error: null,
};

const getBudgetListBeginState = state => ({
  ...state,
  loading: true,
  error: null,
});

const getBudgetListSuccessState = (state, action) => ({
  ...state,
  loading: false,
  budget: action.payload.budget,
});

const getBudgetListFailureState = (state, action) => ({
  ...state,
  budget: {},
  loading: false,
  error: action.payload.error,
});
const getBudgetList = createReducer(initialState, {
  [GET_BUDGET_LIST_BEGIN]: getBudgetListBeginState,
  [GET_BUDGET_LIST_SUCCESS]: getBudgetListSuccessState,
  [GET_BUDGET_LIST_FAILURE]: getBudgetListFailureState,
});

export default getBudgetList;
