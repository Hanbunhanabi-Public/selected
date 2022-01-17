const url = require('url');
const config = require('./config');

module.exports = {
  APIkey: config.APIkey,
  APIurl: config.baseUrl.hostname,
  generateAPIRequestURL(
    flightNumber,
    flightDate,
    aircraftImage = false,
    aircraftLocation = false,
  ) {
    const baseUrlConfig = config.baseUrl;
    const queryConfig = config.query;
    const requestQuery = {};

    requestQuery[queryConfig.location] = aircraftImage;
    requestQuery[queryConfig.image] = aircraftLocation;

    const requestPath = `${baseUrlConfig.path}/${flightNumber}/${flightDate}`;

    return url.format({
      protocol: baseUrlConfig.protocol,
      hostname: baseUrlConfig.hostname,
      pathname: requestPath,
      query: requestQuery,
    });
  },
};
