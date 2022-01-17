const config = require('./config');

module.exports = function locationAPIRequest(location) {
  const request = {
    method: 'GET',
    url: `${config.baseUrl.protocol}${config.baseUrl.hostname}${config.baseUrl.locationPath}`,
    qs: {
      location_id: '1',
      limit: '1',
      sort: 'relevance',
      offset: '0',
      lang: 'en_US',
      currency: 'USD',
      units: 'km',
      query: location,
    },
    headers: {
      'x-rapidapi-host': `${config.baseUrl.hostname}`,
      'x-rapidapi-key': `${config.APIkey}`,
    },
  };
  return request;
};
