import reducer from '../../../src/reducers/Flight/getFlight';
import * as types from '../../../src/actions/Flight/fetchFlight';

describe('getFlight reducer test', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      flight: [],
      loading: false,
      error: null,
    });
  });

  it('should handle GET_FLIGHT_BEGIN', () => {
    expect(
      reducer([], {
        type: types.GET_FLIGHT_BEGIN,
      }),
    ).toEqual({
      loading: true,
      error: null,
    });
  });

  it('should handle GET_FLIGHT_SUCCESS', () => {
    expect(
      reducer([], {
        type: types.GET_FLIGHT_SUCCESS,
        payload: {flight: [{name: 'Test Flight'}]},
      }),
    ).toEqual({
      flight: [{name: 'Test Flight'}],
      loading: false,
    });
    expect(
      reducer(
        {
          flight: [],
          loading: true,
          error: null,
        },
        {
          type: types.GET_FLIGHT_SUCCESS,
          payload: {flight: [{name: 'Test Flight'}]},
        },
      ),
    ).toEqual({
      flight: [{name: 'Test Flight'}],
      loading: false,
      error: null,
    });
  });

  it('should handle GET_FLIGHT_FAILURE', () => {
    expect(
      reducer([], {
        type: types.GET_FLIGHT_FAILURE,
        payload: {error: 'Test Error'},
      }),
    ).toEqual({
      flight: [],
      loading: false,
      error: 'Test Error',
    });
    expect(
      reducer(
        {
          flight: [],
          loading: true,
          error: null,
        },
        {
          type: types.GET_FLIGHT_FAILURE,
          payload: {error: 'Test Error'},
        },
      ),
    ).toEqual({
      flight: [],
      loading: false,
      error: 'Test Error',
    });
  });
});
