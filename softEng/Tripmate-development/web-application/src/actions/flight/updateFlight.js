import axios from 'axios';

export const UPDATE_FLIGHT_BEGIN = 'UPDATE_FLIGHT_BEGIN';
export const UPDATE_FLIGHT_SUCCESS = 'UPDATE_FLIGHT_SUCCESS';
export const UPDATE_FLIGHT_FAILURE = 'UPDATE_FLIGHT_FAILURE';

export const updateFlightBegin = () => ({
  type: UPDATE_FLIGHT_BEGIN,
});

export const updateFlightSuccess = successMessage => ({
  type: UPDATE_FLIGHT_SUCCESS,
  payload: {successMessage},
});

export const updateFlightFail = error => ({
  type: UPDATE_FLIGHT_FAILURE,
  payload: {error},
});

export const updateFlight = (
  flightID,
  departureCity,
  departureCountry,
  departureAirport,
  departureGate,
  departureTime,
  arrivalCity,
  arrivalCountry,
  arrivalAirport,
  arrivalGate,
  arrivalTime,
  flightNumber,
  flightDate,
  airline,
) => {
  return dispatch => {
    dispatch(updateFlightBegin());

    return axios
      .post(`/flight/update/${flightID}`, {
        departure: {
          airport: {
            name: departureAirport,
            municipalityName: departureCity,
            countryCode: departureCountry,
          },
          scheduledTimeLocal: departureTime,
          gate: departureGate,
        },
        arrival: {
          airport: {
            name: arrivalAirport,
            municipalityName: arrivalCity,
            countryCode: arrivalCountry,
          },
          scheduledTimeLocal: arrivalTime,
          gate: arrivalGate,
        },
        number: flightNumber,
        date: flightDate,
        airline,
      })
      .then(response => response.data)
      .then(successMessage => dispatch(updateFlightSuccess(successMessage)))
      .catch(error => dispatch(updateFlightFail(error)));
  };
};
