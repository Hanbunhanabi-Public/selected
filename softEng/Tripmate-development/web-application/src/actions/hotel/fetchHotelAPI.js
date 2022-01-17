const axios = require('axios');

export const API_HOTEL_BEGIN = 'API_HOTEL_BEGIN';
export const API_HOTEL_SUCCESS = 'API_HOTEL_SUCCESS';
export const API_HOTEL_FAILURE = 'API_HOTEL_FAILURE';

export const fetchHotelAPIBegin = () => ({
  type: API_HOTEL_BEGIN,
});

export const fetchHotelAPISuccess = hotel => ({
  type: API_HOTEL_SUCCESS,
  payload: {hotel},
});

export const fetchHotelAPIError = error => ({
  type: API_HOTEL_FAILURE,
  payload: {error},
});

export const fetchHotelAPI = (location, adults, rooms, nights, checkIn) => {
  return dispatch => {
    dispatch(fetchHotelAPIBegin());

    return axios
      .post('/hotel/api', {location, adults, rooms, nights, checkIn})
      .then(response => response.data)
      .then(hotel => dispatch(fetchHotelAPISuccess(hotel)))
      .catch(error => dispatch(fetchHotelAPIError(error)));
  };
};
