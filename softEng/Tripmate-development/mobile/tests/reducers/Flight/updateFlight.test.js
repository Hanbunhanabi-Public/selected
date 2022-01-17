import reducer from '../../../src/reducers/Flight/updateFlight';
import * as types from '../../../src/actions/Flight/updateFlight';

describe('updateFlight reducer test', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      updateSuccessMessage: null,
      updateLoading: false,
      updateError: null,
    });
  });

  it('should handle UPDATE_FLIGHT_BEGIN', () => {
    expect(
      reducer([], {
        type: types.UPDATE_FLIGHT_BEGIN,
      }),
    ).toEqual({
      updateLoading: true,
      updateError: null,
    });
  });

  it('should handle UPDATE_FLIGHT_SUCCESS', () => {
    expect(
      reducer([], {
        type: types.UPDATE_FLIGHT_SUCCESS,
        payload: {
          successMessage: 'Flight Updated!',
        },
      }),
    ).toEqual({
      updateLoading: false,
      updateSuccessMessage: 'Flight Updated!',
    });
    expect(
      reducer(
        {updateSuccessMessage: null, updateLoading: true, updateError: null},
        {
          type: types.UPDATE_FLIGHT_SUCCESS,
          payload: {
            successMessage: 'Flight Updated!',
          },
        },
      ),
    ).toEqual({
      updateLoading: false,
      updateError: null,
      updateSuccessMessage: 'Flight Updated!',
    });
  });

  it('should handle UPDATE_FLIGHT_FAILURE', () => {
    expect(
      reducer([], {
        type: types.UPDATE_FLIGHT_FAILURE,
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
          type: types.UPDATE_FLIGHT_FAILURE,
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
