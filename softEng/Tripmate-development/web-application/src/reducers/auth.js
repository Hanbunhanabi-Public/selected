import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
} from '../actions/types';
import createReducer from './createReducer';

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: false,
  loading: true,
  user: null,
};

const registerSuccess = (state, action) => {
  const {payload} = action;
  localStorage.setItem('token', payload.token);
  return {...state, ...payload, isAuthenticated: true, loading: false};
};

const registerFail = state => {
  localStorage.removeItem('token');
  return {
    ...state,
    token: null,
    isAuthenticated: false,
    loading: false,
  };
};

const userLoaded = (state, action) => {
  localStorage.setItem('isAuthenticated', true);
  const {payload} = action;
  return {...state, isAuthenticated: true, loading: false, user: payload};
};

const authError = state => {
  localStorage.removeItem('token');
  return {
    ...state,
    token: null,
    isAuthenticated: false,
    loading: false,
  };
};

const loginSuccess = (state, action) => {
  const {payload} = action;
  localStorage.setItem('token', payload.token);
  localStorage.setItem('isAuthenticated', true);
  return {...state, ...payload, isAuthenticated: true, loading: false};
};

const loginFail = state => {
  localStorage.removeItem('token');
  localStorage.setItem('isAuthenticated', false);

  return {
    ...state,
    token: null,
    isAuthenticated: false,
    loading: false,
  };
};

const logout = state => {
  state = undefined;
  localStorage.removeItem('token');
  return {
    ...state,
    token: null,
    isAuthenticated: false,
    loading: false,
  };
};

const auth = createReducer(initialState, {
  [REGISTER_SUCCESS]: registerSuccess,
  [REGISTER_FAIL]: registerFail,
  [USER_LOADED]: userLoaded,
  [AUTH_ERR]: authError,
  [LOGIN_SUCCESS]: loginSuccess,
  [LOGIN_FAIL]: loginFail,
  [LOGOUT]: logout,
});

export default auth;
