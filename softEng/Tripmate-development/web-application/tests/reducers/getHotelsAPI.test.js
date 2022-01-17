import reducer from '../../src/reducers/hotel/getHotelsAPI';
import * as types from '../../src/actions/hotel/fetchHotelAPI';

describe('getHotelsAPI reducer test', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      hotelAPI: [],
      loadingAPI: false,
      errorAPI: null,
    });
  });

  it('should handle API_HOTEL_BEGIN', () => {
    expect(
      reducer([], {
        type: types.API_HOTEL_BEGIN,
      }),
    ).toEqual({
      loadingAPI: true,
      errorAPI: null,
    });
  });

  it('should handle API_HOTEL_SUCCESS', () => {
    expect(
      reducer([], {
        type: types.API_HOTEL_SUCCESS,
        payload: {hotel: [{name: 'Test Hotel'}]},
      }),
    ).toEqual({
      hotelAPI: [{name: 'Test Hotel'}],
      loadingAPI: false,
    });
    expect(
      reducer(
        {
          hotelAPI: [],
          loadingAPI: true,
          errorAPI: null,
        },
        {
          type: types.API_HOTEL_SUCCESS,
          payload: {hotel: [{name: 'Test Hotel'}]},
        },
      ),
    ).toEqual({
      hotelAPI: [{name: 'Test Hotel'}],
      loadingAPI: false,
      errorAPI: null,
    });
  });

  it('should handle API_HOTEL_FAILURE', () => {
    expect(
      reducer([], {
        type: types.API_HOTEL_FAILURE,
        payload: {error: 'Test Error'},
      }),
    ).toEqual({
      hotelAPI: [],
      loadingAPI: false,
      errorAPI: 'Test Error',
    });
    expect(
      reducer(
        {
          hotelAPI: [],
          loadingAPI: true,
          errorAPI: null,
        },
        {
          type: types.API_HOTEL_FAILURE,
          payload: {error: 'Test Error'},
        },
      ),
    ).toEqual({
      hotelAPI: [],
      loadingAPI: false,
      errorAPI: 'Test Error',
    });
  });
});
