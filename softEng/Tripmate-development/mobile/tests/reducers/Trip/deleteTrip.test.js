import reducer from '../../../src/reducers/Trip/deleteTrip';
import * as types from '../../../src/actions/Trip/deleteTrip';

describe('deleteTripList reducer test', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      deleteMessage: '',
      deleting: true,
      error: null,
    });
  });

  it('should handle DELETE_TRIP_BEGIN', () => {
    expect(
      reducer([], {
        type: types.DELETE_TRIP_BEGIN,
      }),
    ).toEqual({
      deleting: true,
      error: null,
    });
  });

  it('should handle DELETE_TRIP_SUCCESS', () => {
    expect(
      reducer([], {
        type: types.DELETE_TRIP_SUCCESS,
        payload: {
          data: 'Trip deleted.',
        },
      }),
    ).toEqual({
      deleting: false,
      deleteMessage: 'Trip deleted.',
    });
    expect(
      reducer(
        {deleteMessage: '', deleting: true, error: null},
        {
          type: types.DELETE_TRIP_SUCCESS,
          payload: {
            data: 'Trip deleted.',
          },
        },
      ),
    ).toEqual({
      deleting: false,
      error: null,
      deleteMessage: 'Trip deleted.',
    });
  });

  it('should handle DELETE_TRIP_FAILURE', () => {
    expect(
      reducer([], {
        type: types.DELETE_TRIP_FAILURE,
        payload: {error: 'Test Error'},
      }),
    ).toEqual({
      deleteMessage: undefined,
      deleting: false,
      error: 'Test Error',
    });
    expect(
      reducer(
        {
          deleting: true,
          error: null,
        },
        {
          type: types.DELETE_TRIP_FAILURE,
          payload: {error: 'Test Error'},
        },
      ),
    ).toEqual({
      deleting: false,
      error: 'Test Error',
    });
  });
});
