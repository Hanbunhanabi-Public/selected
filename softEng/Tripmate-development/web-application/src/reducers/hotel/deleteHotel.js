import {
  DELETE_HOTEL_BEGIN,
  DELETE_HOTEL_SUCCESS,
  DELETE_HOTEL_FAILURE,
} from '../../actions/hotel/deleteHotel';
import createReducer from '../createReducer';

const initialState = {
  deleteSuccessMessage: null,
  deleteLoading: false,
  deleteError: null,
};

const deleteHotelBeginState = state => ({
  ...state,
  deleteLoading: true,
  deleteError: null,
});

const deleteHotelSuccessState = (state, action) => ({
  ...state,
  deleteSuccessMessage: action.payload.successMessage,
  deleteLoading: false,
});

const deleteHotelFailureState = (state, action) => ({
  ...state,
  deleteSuccessMessage: null,
  deleteLoading: false,
  deleteError: action.payload.error,
});

const deleteHotel = createReducer(initialState, {
  [DELETE_HOTEL_BEGIN]: deleteHotelBeginState,
  [DELETE_HOTEL_SUCCESS]: deleteHotelSuccessState,
  [DELETE_HOTEL_FAILURE]: deleteHotelFailureState,
});

export default deleteHotel;
