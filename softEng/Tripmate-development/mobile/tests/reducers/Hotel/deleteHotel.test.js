import reducer from '../../../src/reducers/Hotel/deleteHotel';
import * as types from '../../../src/actions/Hotel/deleteHotel';

describe('deleteHotel reducer test', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      deleteSuccessMessage: null,
      deleteLoading: false,
      deleteError: null,
    });
  });

  it('should handle DELETE_HOTEL_BEGIN', () => {
    expect(
      reducer([], {
        type: types.DELETE_HOTEL_BEGIN,
      }),
    ).toEqual({
      deleteLoading: true,
      deleteError: null,
    });
  });

  it('should handle DELETE_HOTEL_SUCCESS', () => {
    expect(
      reducer([], {
        type: types.DELETE_HOTEL_SUCCESS,
        payload: {
          successMessage: 'Hotel Deleted.',
        },
      }),
    ).toEqual({
      deleteLoading: false,
      deleteSuccessMessage: 'Hotel Deleted.',
    });
    expect(
      reducer(
        {deleteSuccessMessage: null, deleteLoading: true, deleteError: null},
        {
          type: types.DELETE_HOTEL_SUCCESS,
          payload: {
            successMessage: 'Hotel Deleted.',
          },
        },
      ),
    ).toEqual({
      deleteLoading: false,
      deleteError: null,
      deleteSuccessMessage: 'Hotel Deleted.',
    });
  });

  it('should handle DELETE_HOTEL_FAILURE', () => {
    expect(
      reducer([], {
        type: types.DELETE_HOTEL_FAILURE,
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
          type: types.DELETE_HOTEL_FAILURE,
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
