import reducer from '../../../src/reducers/Event/deleteEvent';
import * as types from '../../../src/actions/Event/deleteEvent';

describe('deleteEvent reducer test', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      deleteSuccessMessage: null,
      deleteLoading: false,
      deleteError: null,
    });
  });

  it('should handle DELETE_EVENT_BEGIN', () => {
    expect(
      reducer([], {
        type: types.DELETE_EVENT_BEGIN,
      }),
    ).toEqual({
      deleteLoading: true,
      deleteError: null,
    });
  });

  it('should handle DELETE_EVENT_SUCCESS', () => {
    expect(
      reducer([], {
        type: types.DELETE_EVENT_SUCCESS,
        payload: {
          successMessage: 'Event Deleted.',
        },
      }),
    ).toEqual({
      deleteLoading: false,
      deleteSuccessMessage: 'Event Deleted.',
    });
    expect(
      reducer(
        {deleteSuccessMessage: null, deleteLoading: true, deleteError: null},
        {
          type: types.DELETE_EVENT_SUCCESS,
          payload: {
            successMessage: 'Event Deleted.',
          },
        },
      ),
    ).toEqual({
      deleteLoading: false,
      deleteError: null,
      deleteSuccessMessage: 'Event Deleted.',
    });
  });

  it('should handle DELETE_EVENT_FAILURE', () => {
    expect(
      reducer([], {
        type: types.DELETE_EVENT_FAILURE,
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
          type: types.DELETE_EVENT_FAILURE,
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
