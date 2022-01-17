import axios from 'axios';
import {url} from '../utils/globalVars';

export const CREATE_USER_BEGIN = 'CREATE_USER_BEGIN';
export const CREATE_USER_SUCCESS = 'CREATE_USER_SUCCESS';
export const CREATE_USER_FAILURE = 'CREATE_USER_FAILURE';

export const createUserBegin = () => ({
  type: CREATE_USER_BEGIN,
});

export const createUserSuccess = token => ({
  type: CREATE_USER_SUCCESS,
  payload: {token},
});

export const createUserFail = error => ({
  type: CREATE_USER_FAILURE,
  payload: {error},
});

export const createUser = (name, email, password) => {
  return dispatch => {
    dispatch(createUserBegin());

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const body = JSON.stringify({name, email, password});

    return axios
      .post(`${url}/users`, body, config)
      .then(response => dispatch(createUserSuccess(response.data)))
      .catch(error => dispatch(createUserFail(error)));
  };
};
