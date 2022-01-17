import reducer from '../../src/reducers/hotel/updateHotel';
import * as types from '../../src/actions/hotel/updateHotel';

describe('updateHotel reducer test', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      updateSuccessMessage: null,
      updateLoading: false,
      updateError: null,
    });
  });

  it('should handle UPDATE_HOTEL_BEGIN', () => {
    expect(
      reducer([], {
        type: types.UPDATE_HOTEL_BEGIN,
      }),
    ).toEqual({
      updateLoading: true,
      updateError: null,
    });
  });

  it('should handle UPDATE_HOTEL_SUCCESS', () => {
    expect(
      reducer([], {
        type: types.UPDATE_HOTEL_SUCCESS,
        payload: {
          successMessage: 'Hotel Updated!',
        },
      }),
    ).toEqual({
      updateLoading: false,
      updateSuccessMessage: 'Hotel Updated!',
    });
    expect(
      reducer(
        {updateSuccessMessage: null, updateLoading: true, updateError: null},
        {
          type: types.UPDATE_HOTEL_SUCCESS,
          payload: {
            successMessage: 'Hotel Updated!',
          },
        },
      ),
    ).toEqual({
      updateLoading: false,
      updateError: null,
      updateSuccessMessage: 'Hotel Updated!',
    });
  });

  it('should handle UPDATE_HOTEL_FAILURE', () => {
    expect(
      reducer([], {
        type: types.UPDATE_HOTEL_FAILURE,
        payload: {error: 'Test Error'},
      }),
    ).toEqual({
      updateLoading: false,
      updateError: 'Test Error',
      updateSuccessMessage: null,
    });
    expect(
      reducer(
        {
          updateLoading: true,
          updateError: null,
        },
        {
          type: types.UPDATE_HOTEL_FAILURE,
          payload: {error: 'Test Error'},
        },
      ),
    ).toEqual({
      updateSuccessMessage: null,
      updateLoading: false,
      updateError: 'Test Error',
    });
  });
});
