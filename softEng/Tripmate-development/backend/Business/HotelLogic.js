const request = require('request');
const locationAPIRequest = require('../api/hotel/locationUtils');
const hotelAPIRequest = require('../api/hotel/hotelUtils');
const {Hotel} = require('../models/hotel.model');

module.exports = function apiRequest(location, adults, rooms, nights, checkIn) {
  return new Promise(resolve => {
    const checkOut = new Date(checkIn);
    checkOut.setDate(checkOut.getDate() + parseInt(nights, 10));
    const hotelList = [{Hotel}, {Hotel}, {Hotel}, {Hotel}, {Hotel}];

    if (location !== '') {
      request(locationAPIRequest(location), function call1(
        error,
        response,
        body,
      ) {
        const locationData = JSON.parse(body);

        if (Array.isArray(locationData.data) && locationData.data.length > 0) {
          const locationId = locationData.data[0].result_object.location_id;

          request(
            hotelAPIRequest(locationId, adults, rooms, checkIn, nights),
            function call2(error1, response1, body1) {
              const hotelData = JSON.parse(body1);

              if (Array.isArray(hotelData.data) && hotelData.data.length > 0) {
                for (let i = 0; i < 5; i += 1) {
                  hotelList[i] = {
                    name: hotelData.data[i].name,
                    location: hotelData.data[i].location_string,
                    price: hotelData.data[i].price,
                    numRating: hotelData.data[i].num_reviews,
                    rating: hotelData.data[i].rating,
                    priceLevel: hotelData.data[i].price_level,
                    checkIn,
                    checkOut: checkOut.toISOString().slice(0, 10),
                  };
                }
              }
              resolve(hotelList);
            },
          );
        } else {
          resolve('Hotel API failed.');
        }
      });
    } else {
      resolve('Hotel API failed.');
    }
  });
};
