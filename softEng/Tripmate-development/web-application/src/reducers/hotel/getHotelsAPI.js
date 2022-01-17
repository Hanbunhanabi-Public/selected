import createReducer from '../createReducer';

import {
  API_HOTEL_BEGIN,
  API_HOTEL_SUCCESS,
  API_HOTEL_FAILURE,
} from '../../actions/hotel/fetchHotelAPI';

const initialState = {
  hotelAPI: [],
  loadingAPI: false,
  errorAPI: null,
};

const hotelAPIBeginState = state => ({
  ...state,
  loadingAPI: true,
  errorAPI: null,
});

const hotelAPISuccessState = (state, action) => ({
  ...state,
  hotelAPI: action.payload.hotel,
  loadingAPI: false,
});

const hotelAPIFailureState = (state, action) => ({
  ...state,
  hotelAPI: [],
  loadingAPI: false,
  errorAPI: action.payload.error,
});

const getHotelsAPI = createReducer(initialState, {
  [API_HOTEL_BEGIN]: hotelAPIBeginState,
  [API_HOTEL_SUCCESS]: hotelAPISuccessState,
  [API_HOTEL_FAILURE]: hotelAPIFailureState,
});

export default getHotelsAPI;
