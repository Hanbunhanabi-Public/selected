import {
  FETCH_USER_BEGIN,
  FETCH_USER_SUCCESS,
  FETCH_USER_FAILURE,
} from '../actions/fetchUser';
import createReducer from './createReducer';

const initialState = {
  user: {},
  loading: false,
  error: null,
};

const userBeginState = state => ({
  ...state,
  loading: true,
  error: null,
});

const userSuccessState = (state, action) => ({
  ...state,
  user: action.payload.user,
  loading: false,
});

const userFailureState = (state, action) => ({
  ...state,
  user: {},
  loading: false,
  error: action.payload.error,
});

const getUser = createReducer(initialState, {
  [FETCH_USER_BEGIN]: userBeginState,
  [FETCH_USER_SUCCESS]: userSuccessState,
  [FETCH_USER_FAILURE]: userFailureState,
});

export default getUser;
