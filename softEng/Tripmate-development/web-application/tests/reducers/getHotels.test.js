import reducer from '../../src/reducers/hotel/getHotels';
import * as types from '../../src/actions/hotel/fetchHotel';

describe('getHotels reducer test', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      hotel: [],
      loading: false,
      error: null,
    });
  });

  it('should handle GET_HOTEL_BEGIN', () => {
    expect(
      reducer([], {
        type: types.GET_HOTEL_BEGIN,
      }),
    ).toEqual({
      loading: true,
      error: null,
    });
  });

  it('should handle GET_HOTEL_SUCCESS', () => {
    expect(
      reducer([], {
        type: types.GET_HOTEL_SUCCESS,
        payload: {hotel: [{name: 'Test Hotel'}]},
      }),
    ).toEqual({
      hotel: [{name: 'Test Hotel'}],
      loading: false,
    });
    expect(
      reducer(
        {
          hotel: [],
          loading: true,
          error: null,
        },
        {
          type: types.GET_HOTEL_SUCCESS,
          payload: {hotel: [{name: 'Test Hotel'}]},
        },
      ),
    ).toEqual({
      hotel: [{name: 'Test Hotel'}],
      loading: false,
      error: null,
    });
  });

  it('should handle GET_HOTEL_FAILURE', () => {
    expect(
      reducer([], {
        type: types.GET_HOTEL_FAILURE,
        payload: {error: 'Test Error'},
      }),
    ).toEqual({
      hotel: [],
      loading: false,
      error: 'Test Error',
    });
    expect(
      reducer(
        {
          hotel: [],
          loading: true,
          error: null,
        },
        {
          type: types.GET_HOTEL_FAILURE,
          payload: {error: 'Test Error'},
        },
      ),
    ).toEqual({
      hotel: [],
      loading: false,
      error: 'Test Error',
    });
  });
});
