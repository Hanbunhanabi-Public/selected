import axios from 'axios';
import {url} from '../utils/globalVars';

export const FETCH_USER_BEGIN = 'FETCH_USER_BEGIN';
export const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS';
export const FETCH_USER_FAILURE = 'FETCH_USER_FAILURE';

export const fetchUserBegin = () => ({
  type: FETCH_USER_BEGIN,
});

export const fetchUserSuccess = user => ({
  type: FETCH_USER_SUCCESS,
  payload: {user},
});

export const fetchUserFail = error => ({
  type: FETCH_USER_FAILURE,
  payload: {error},
});

export const fetchUser = token => {
  return dispatch => {
    dispatch(fetchUserBegin());

    const config = {
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': token,
      },
    };

    return axios
      .get(`${url}/auth`, config)
      .then(response => dispatch(fetchUserSuccess(response.data)))
      .catch(error => dispatch(fetchUserFail(error)));
  };
};
