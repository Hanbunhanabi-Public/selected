import axios from 'axios';
import {url} from '../utils/globalVars';

export const LOGIN_USER_BEGIN = 'LOGIN_USER_BEGIN';
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
export const LOGIN_USER_FAILURE = 'LOGIN_USER_FAILURE';

export const loginUserBegin = () => ({
  type: LOGIN_USER_BEGIN,
});

export const loginUserSuccess = token => ({
  type: LOGIN_USER_SUCCESS,
  payload: {token},
});

export const loginUserFail = error => ({
  type: LOGIN_USER_FAILURE,
  payload: {error},
});

export const loginUser = (email, password) => {
  return dispatch => {
    dispatch(loginUserBegin());

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const body = JSON.stringify({email, password});

    return axios
      .post(`${url}/auth`, body, config)
      .then(response => response.data)
      .then(token => dispatch(loginUserSuccess(token)))
      .catch(error => dispatch(loginUserFail(error)));
  };
};
