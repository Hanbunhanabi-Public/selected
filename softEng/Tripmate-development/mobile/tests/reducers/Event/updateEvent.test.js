import reducer from '../../../src/reducers/Event/updateEvent';
import * as types from '../../../src/actions/Event/updateEvent';

describe('updateEvent reducer test', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      updateSuccessMessage: null,
      updateLoading: false,
      updateError: null,
    });
  });

  it('should handle UPDATE_EVENT_BEGIN', () => {
    expect(
      reducer([], {
        type: types.UPDATE_EVENT_BEGIN,
      }),
    ).toEqual({
      updateLoading: true,
      updateError: null,
    });
  });

  it('should handle UPDATE_EVENT_SUCCESS', () => {
    expect(
      reducer([], {
        type: types.UPDATE_EVENT_SUCCESS,
        payload: {
          successMessage: 'Event Updated!',
        },
      }),
    ).toEqual({
      updateLoading: false,
      updateSuccessMessage: 'Event Updated!',
    });
    expect(
      reducer(
        {updateSuccessMessage: null, updateLoading: true, updateError: null},
        {
          type: types.UPDATE_EVENT_SUCCESS,
          payload: {
            successMessage: 'Event Updated!',
          },
        },
      ),
    ).toEqual({
      updateLoading: false,
      updateError: null,
      updateSuccessMessage: 'Event Updated!',
    });
  });

  it('should handle UPDATE_EVENT_FAILURE', () => {
    expect(
      reducer([], {
        type: types.UPDATE_EVENT_FAILURE,
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
          type: types.UPDATE_EVENT_FAILURE,
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
