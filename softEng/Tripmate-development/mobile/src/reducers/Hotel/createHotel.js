import createReducer from '../createReducer';

import {
  CREATE_HOTEL_BEGIN,
  CREATE_HOTEL_SUCCESS,
  CREATE_HOTEL_FAILURE,
} from '../../actions/Hotel/createHotel';

const initialState = {
  createSuccessMessage: null,
  createLoading: false,
  createError: null,
};

const createHotelBeginState = state => ({
  ...state,
  createLoading: true,
  createError: null,
});

const createHotelSuccessState = (state, action) => ({
  ...state,
  createSuccessMessage: action.payload.successMessage,
  createLoading: false,
});

const createHotelFailureState = (state, action) => ({
  ...state,
  createSuccessMessage: null,
  createLoading: false,
  createError: action.payload.error,
});

const createHotel = createReducer(initialState, {
  [CREATE_HOTEL_BEGIN]: createHotelBeginState,
  [CREATE_HOTEL_SUCCESS]: createHotelSuccessState,
  [CREATE_HOTEL_FAILURE]: createHotelFailureState,
});

export default createHotel;
