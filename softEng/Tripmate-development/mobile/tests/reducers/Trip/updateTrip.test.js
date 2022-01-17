import reducer from '../../../src/reducers/Trip/updateTrip';
import * as types from '../../../src/actions/Trip/updateTrip';

describe('update trip reducer test', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      successMessage: '',
      uploading: true,
      error: null,
    });
  });

  it('should handle UPDATE_TRIP_BEGIN', () => {
    expect(
      reducer([], {
        type: types.UPDATE_TRIP_BEGIN,
      }),
    ).toEqual({
      uploading: true,
      error: null,
    });
  });

  it('should handle UPDATE_TRIP_SUCCESS', () => {
    expect(
      reducer([], {
        type: types.UPDATE_TRIP_SUCCESS,
        payload: {
          data: 'Trip updated.',
        },
      }),
    ).toEqual({
      uploading: false,
      successMessage: 'Trip updated.',
    });
    expect(
      reducer(
        {successMessage: '', uploading: true, error: null},
        {
          type: types.UPDATE_TRIP_SUCCESS,
          payload: {
            data: 'Trip updated.',
          },
        },
      ),
    ).toEqual({
      uploading: false,
      error: null,
      successMessage: 'Trip updated.',
    });
  });

  it('should handle UPDATE_TRIP_FAILURE', () => {
    expect(
      reducer([], {
        type: types.UPDATE_TRIP_FAILURE,
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
          type: types.UPDATE_TRIP_FAILURE,
          payload: {error: 'Test Error'},
        },
      ),
    ).toEqual({
      uploading: false,

      error: 'Test Error',
    });
  });
});
