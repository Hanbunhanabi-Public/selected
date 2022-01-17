import {
  GET_USER_BEGIN,
  GET_USER_SUCCESS,
  GET_USER_FAILURE,
} from '../../actions';
import createReducer from '../createReducer';

const initialState = {
  user: [],
  loading: true,
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
  user: [],
  loading: false,
  error: action.payload.error,
});

const getUser = createReducer(initialState, {
  [GET_USER_BEGIN]: userBeginState,
  [GET_USER_SUCCESS]: userSuccessState,
  [GET_USER_FAILURE]: userFailureState,
});

export default getUser;
