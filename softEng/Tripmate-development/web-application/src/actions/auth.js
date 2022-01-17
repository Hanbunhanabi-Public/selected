import axios from 'axios';
import {setAlert} from './createAlert';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERR,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT,
} from './types';
import setAuthToken from '../utils/setAuthToken';

export const fetchLogout = () => ({
  type: LOGOUT,
});

export const fetchLoginSuccess = login => ({
  type: LOGIN_SUCCESS,
  payload: login,
});

export const fetchLoginFail = () => ({
  type: LOGIN_FAIL,
});

export const fetchRegisterSuccess = register => ({
  type: REGISTER_SUCCESS,
  payload: register,
});

export const fetchAuthError = authError => ({
  type: AUTH_ERR,
  payload: authError,
});

export const fetchUserLoaded = user => ({
  type: USER_LOADED,
  payload: user,
});

export const fetchRegisterFail = () => ({
  type: REGISTER_FAIL,
});

// Load User
export const loadUser = () => async dispatch => {
  // check if token and if there is then put it in global header.
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    const res = await axios.get('/auth');
    dispatch(fetchUserLoaded(res.data));
  } catch (err) {
    dispatch(fetchAuthError(err));
  }
};

// Register User
export const register = ({name, email, password}) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({name, email, password});

  try {
    const res = await axios.post('/users', body, config);
    dispatch(fetchRegisterSuccess(res.data));
    dispatch(loadUser());
  } catch (err) {
    /* eslint-disable */
    const errors = err.response.data.errors;
    /* eslint-enable */

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch(fetchRegisterFail());
  }
};

// Login User
export const login = (email, password) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({email, password});

  try {
    const res = await axios.post('/auth', body, config);

    dispatch(fetchLoginSuccess(res.data));

    dispatch(loadUser());
  } catch (err) {
    /* eslint-disable */

    const errors = err.response.data.errors;
    /* eslint-enable */

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch(fetchLoginFail());
  }
};

// Logout
export const logout = () => dispatch => {
  dispatch(fetchLogout());
};
