import {
  LOGIN_USER_BEGIN,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILURE,
} from '../actions/loginUser';
import createReducer from './createReducer';

const initialState = {
  token: {},
  loginLoading: false,
  loginError: null,
};

const loginUserBeginState = state => ({
  ...state,
  loginLoading: true,
  loginError: null,
});

const loginUserSuccessState = (state, action) => ({
  ...state,
  token: action.payload.token,
  loginLoading: false,
});

const loginUserFailureState = (state, action) => ({
  ...state,
  token: {},
  loginLoading: false,
  loginError: action.payload.error,
});

const loginUser = createReducer(initialState, {
  [LOGIN_USER_BEGIN]: loginUserBeginState,
  [LOGIN_USER_SUCCESS]: loginUserSuccessState,
  [LOGIN_USER_FAILURE]: loginUserFailureState,
});

export default loginUser;
