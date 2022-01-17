import {
  UPDATE_BUDGET_BEGIN,
  UPDATE_BUDGET_FAILURE,
  UPDATE_BUDGET_SUCCESS,
} from '../../actions/Budget/updateBudget';
import createReducer from '../createReducer';
const initialState = {
  successMessage: '',
  uploading: false,
  error: null,
};

const updateBudgetBeginState = state => ({
  ...state,
  uploading: true,
  error: null,
});

const updateBudgetSuccessState = (state, action) => ({
  ...state,
  uploading: false,
  successMessage: action.payload.data,
});

const updateBudgetFailureState = (state, action) => ({
  ...state,
  uploading: false,
  error: action.payload.error,
});
const updateBudget = createReducer(initialState, {
  [UPDATE_BUDGET_BEGIN]: updateBudgetBeginState,
  [UPDATE_BUDGET_SUCCESS]: updateBudgetSuccessState,
  [UPDATE_BUDGET_FAILURE]: updateBudgetFailureState,
});

export default updateBudget;
