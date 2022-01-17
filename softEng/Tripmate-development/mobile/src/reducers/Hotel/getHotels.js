import createReducer from '../createReducer';

import {
  GET_HOTEL_BEGIN,
  GET_HOTEL_SUCCESS,
  GET_HOTEL_FAILURE,
} from '../../actions/Hotel/fetchHotel';

const initialState = {
  hotel: [],
  loading: false,
  error: null,
};

const hotelBeginState = state => ({
  ...state,
  loading: true,
  error: null,
});

const hotelSuccessState = (state, action) => ({
  ...state,
  hotel: action.payload.hotel,
  loading: false,
});

const hotelFailureState = (state, action) => ({
  ...state,
  hotel: [],
  loading: false,
  error: action.payload.error,
});

const getHotels = createReducer(initialState, {
  [GET_HOTEL_BEGIN]: hotelBeginState,
  [GET_HOTEL_SUCCESS]: hotelSuccessState,
  [GET_HOTEL_FAILURE]: hotelFailureState,
});

export default getHotels;
