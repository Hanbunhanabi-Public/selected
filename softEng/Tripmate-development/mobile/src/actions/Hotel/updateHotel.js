import axios from 'axios';
import {url} from '../../utils/globalVars';

export const UPDATE_HOTEL_BEGIN = 'UPDATE_HOTEL_BEGIN';
export const UPDATE_HOTEL_SUCCESS = 'UPDATE_HOTEL_SUCCESS';
export const UPDATE_HOTEL_FAILURE = 'UPDATE_HOTEL_FAILURE';

export const updateHotelBegin = () => ({
  type: UPDATE_HOTEL_BEGIN,
});

export const updateHotelSuccess = successMessage => ({
  type: UPDATE_HOTEL_SUCCESS,
  payload: {successMessage},
});

export const updateHotelFail = error => ({
  type: UPDATE_HOTEL_FAILURE,
  payload: {error},
});

export const updateHotel = (
  hotelID,
  name,
  price,
  location,
  checkIn,
  checkOut,
  numRating,
  rating,
  priceLevel,
) => {
  return dispatch => {
    dispatch(updateHotelBegin());

    return axios
      .post(url + `/hotel/update/${hotelID}`, {
        name,
        price,
        location,
        checkIn,
        checkOut,
        numRating,
        rating,
        priceLevel,
      })
      .then(response => response.data)
      .then(successMessage => dispatch(updateHotelSuccess(successMessage)))
      .catch(error => dispatch(updateHotelFail(error)));
  };
};
