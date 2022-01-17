import {SET_ALERT, REMOVE_ALERT} from '../actions/types';
import createReducer from './createReducer';

const initialState = [];

const SetAlert = (state, action) => ({
  ...state,
  payload: action.payload,
});

const removeAlert = ({state = initialState, action}) => {
  return state.filter(alert => alert.id !== action.payload);
};

const alert = createReducer(initialState, {
  [SET_ALERT]: SetAlert,
  [REMOVE_ALERT]: removeAlert,
});

export default alert;
