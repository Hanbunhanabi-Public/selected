import {
  CREATE_USER_BEGIN,
  CREATE_USER_SUCCESS,
  CREATE_USER_FAILURE,
} from '../actions/createUser';
import createReducer from './createReducer';

const initialState = {
  token: {},
  createLoading: false,
  createError: null,
};

const createUserBeginState = state => ({
  ...state,
  createLoading: true,
  createError: null,
});

const createUserSuccessState = (state, action) => ({
  ...state,
  token: action.payload.token,
  createLoading: false,
});

const createUserFailureState = (state, action) => ({
  ...state,
  token: {},
  createLoading: false,
  createError: action.payload.error,
});

const createUser = createReducer(initialState, {
  [CREATE_USER_BEGIN]: createUserBeginState,
  [CREATE_USER_SUCCESS]: createUserSuccessState,
  [CREATE_USER_FAILURE]: createUserFailureState,
});

export default createUser;
