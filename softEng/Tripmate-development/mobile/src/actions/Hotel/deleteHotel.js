import axios from 'axios';
import {url} from '../../utils/globalVars';

export const DELETE_HOTEL_BEGIN = 'DELETE_HOTEL_BEGIN';
export const DELETE_HOTEL_SUCCESS = 'DELETE_HOTEL_SUCCESS';
export const DELETE_HOTEL_FAILURE = 'DELETE_HOTEL_FAILURE';

export const deleteHotelBegin = () => ({
  type: DELETE_HOTEL_BEGIN,
});

export const deleteHotelSuccess = successMessage => ({
  type: DELETE_HOTEL_SUCCESS,
  payload: {successMessage},
});

export const deleteHotelFail = error => ({
  type: DELETE_HOTEL_FAILURE,
  payload: {error},
});

export const deleteHotel = hotelID => {
  return dispatch => {
    dispatch(deleteHotelBegin());

    return axios
      .delete(url + `/hotel/${hotelID}`)
      .then(response => response.data)
      .then(successMessage => dispatch(deleteHotelSuccess(successMessage)))
      .catch(error => dispatch(deleteHotelFail(error)));
  };
};
