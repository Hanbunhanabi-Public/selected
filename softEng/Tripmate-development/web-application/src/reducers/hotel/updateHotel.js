import {
  UPDATE_HOTEL_BEGIN,
  UPDATE_HOTEL_SUCCESS,
  UPDATE_HOTEL_FAILURE,
} from '../../actions/hotel/updateHotel';
import createReducer from '../createReducer';

const initialState = {
  updateSuccessMessage: null,
  updateLoading: false,
  updateError: null,
};

const updateHotelBeginState = state => ({
  ...state,
  updateLoading: true,
  updateError: null,
});

const updateHotelSuccessState = (state, action) => ({
  ...state,
  updateSuccessMessage: action.payload.successMessage,
  updateLoading: false,
});

const updateHotelFailureState = (state, action) => ({
  ...state,
  updateSuccessMessage: null,
  updateLoading: false,
  updateError: action.payload.error,
});

const updateHotel = createReducer(initialState, {
  [UPDATE_HOTEL_BEGIN]: updateHotelBeginState,
  [UPDATE_HOTEL_SUCCESS]: updateHotelSuccessState,
  [UPDATE_HOTEL_FAILURE]: updateHotelFailureState,
});

export default updateHotel;
