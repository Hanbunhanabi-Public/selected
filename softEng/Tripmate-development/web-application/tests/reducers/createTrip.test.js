import reducer from '../../src/reducers/trip/createTrip';
import * as types from '../../src/actions/trip/createTrip';

describe('createTrip reducer test', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      successMessage: null,
      uploading: false,
      error: null,
    });
  });

  it('should handle CREATE_TRIP_BEGIN', () => {
    expect(
      reducer([], {
        type: types.CREATE_TRIP_BEGIN,
      }),
    ).toEqual({
      uploading: true,
      error: null,
    });
  });

  it('should handle CREATE_TRIP_SUCCESS', () => {
    expect(
      reducer([], {
        type: types.CREATE_TRIP_SUCCESS,
        payload: {
          data: 'Trip added.',
        },
      }),
    ).toEqual({
      uploading: false,
      successMessage: 'Trip added.',
    });
    expect(
      reducer(
        {successMessage: '', uploading: true, error: null},
        {
          type: types.CREATE_TRIP_SUCCESS,
          payload: {
            data: 'Trip added.',
          },
        },
      ),
    ).toEqual({
      uploading: false,
      error: null,
      successMessage: 'Trip added.',
    });
  });

  it('should handle CREATE_TRIP_FAILURE', () => {
    expect(
      reducer([], {
        type: types.CREATE_TRIP_FAILURE,
        payload: {error: 'Test Error'},
      }),
    ).toEqual({
      uploading: false,

      error: 'Test Error',
    });
    expect(
      reducer(
        {
          uploading: true,
          error: null,
        },
        {
          type: types.CREATE_TRIP_FAILURE,
          payload: {error: 'Test Error'},
        },
      ),
    ).toEqual({
      uploading: false,

      error: 'Test Error',
    });
  });
});
