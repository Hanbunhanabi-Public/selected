const config = require('./config');

module.exports = function hotelAPIRequest(
  locationId,
  adults,
  rooms,
  checkIn,
  nights,
) {
  const request = {
    method: 'GET',
    url: `${config.baseUrl.protocol}${config.baseUrl.hostname}${config.baseUrl.hotelPath}`,
    qs: {
      zff: '4%2C6',
      offset: '0',
      subcategory: 'hotel%2Cbb%2Cspecialty',
      hotel_class: '1%2C2%2C3',
      currency: 'USD',
      amenities: 'beach%2Cbar_lounge%2Cairport_transportation',
      child_rm_ages: '7%2C10',
      limit: '5',
      checkin: checkIn,
      order: 'asc',
      lang: 'en_US',
      sort: 'recommended',
      nights,
      location_id: locationId,
      adults,
      rooms,
    },
    headers: {
      'x-rapidapi-host': `${config.baseUrl.hostname}`,
      'x-rapidapi-key': `${config.APIkey}`,
    },
  };
  return request;
};
