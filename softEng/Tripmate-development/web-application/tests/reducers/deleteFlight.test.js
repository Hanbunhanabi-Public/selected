import reducer from '../../src/reducers/flight/deleteFlight';
import * as types from '../../src/actions/flight/deleteFlight';

describe('deleteFlight reducer test', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      deleteSuccessMessage: null,
      deleteLoading: true,
      deleteError: null,
    });
  });

  it('should handle DELETE_FLIGHT_BEGIN', () => {
    expect(
      reducer([], {
        type: types.DELETE_FLIGHT_BEGIN,
      }),
    ).toEqual({
      deleteLoading: true,
      deleteError: null,
    });
  });

  it('should handle DELETE_FLIGHT_SUCCESS', () => {
    expect(
      reducer([], {
        type: types.DELETE_FLIGHT_SUCCESS,
        payload: {
          successMessage: 'Flight Deleted.',
        },
      }),
    ).toEqual({
      deleteLoading: false,
      deleteSuccessMessage: 'Flight Deleted.',
    });
    expect(
      reducer(
        {deleteSuccessMessage: null, deleteLoading: true, deleteError: null},
        {
          type: types.DELETE_FLIGHT_SUCCESS,
          payload: {
            successMessage: 'Flight Deleted.',
          },
        },
      ),
    ).toEqual({
      deleteLoading: false,
      deleteError: null,
      deleteSuccessMessage: 'Flight Deleted.',
    });
  });

  it('should handle DELETE_FLIGHT_FAILURE', () => {
    expect(
      reducer([], {
        type: types.DELETE_FLIGHT_FAILURE,
        payload: {error: 'Test Error'},
      }),
    ).toEqual({
      deleteLoading: false,
      deleteError: 'Test Error',
      deleteSuccessMessage: null,
    });
    expect(
      reducer(
        {
          deleteLoading: true,
          deleteError: null,
        },
        {
          type: types.DELETE_FLIGHT_FAILURE,
          payload: {error: 'Test Error'},
        },
      ),
    ).toEqual({
      deleteSuccessMessage: null,
      deleteLoading: false,
      deleteError: 'Test Error',
    });
  });
});
