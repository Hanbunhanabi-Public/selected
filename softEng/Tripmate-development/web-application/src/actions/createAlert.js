import {v4 as uuid} from 'uuid';
import {SET_ALERT, REMOVE_ALERT} from './types';

export const fetchCreateAlert = (msg, alertType, id) => ({
  type: SET_ALERT,
  payload: {msg, alertType, id},
});

export const fetchRemoveAlert = id => ({
  payload: id,
  type: REMOVE_ALERT,
});

export const setAlert = (msg, alertType) => dispatch => {
  const id = uuid();

  dispatch(fetchCreateAlert(msg, alertType, id));

  // dispatch({
  //   type: SET_ALERT,
  //   payload: {msg, alertType, id},
  // });
  setTimeout(() => dispatch(fetchRemoveAlert(id)), 5000);
};

export default setAlert;
