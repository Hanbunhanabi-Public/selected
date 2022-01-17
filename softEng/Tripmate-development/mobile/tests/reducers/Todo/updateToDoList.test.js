import reducer from '../../../src/reducers/Todo/updateToDoList';
import * as types from '../../../src/actions/Todo/updateToDoList';

describe('updateToDoList reducer test', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      updateSuccessMessage: null,
      updateLoading: false,
      updateError: null,
    });
  });

  it('should handle UPDATE_TODO_LIST_BEGIN', () => {
    expect(
      reducer([], {
        type: types.UPDATE_TODO_LIST_BEGIN,
      }),
    ).toEqual({
      updateLoading: true,
      updateError: null,
    });
  });

  it('should handle UPDATE_TODO_LIST_SUCCESS', () => {
    expect(
      reducer([], {
        type: types.UPDATE_TODO_LIST_SUCCESS,
        payload: {
          successMessage: 'ToDo List Updated!',
        },
      }),
    ).toEqual({
      updateLoading: false,
      updateSuccessMessage: 'ToDo List Updated!',
    });
    expect(
      reducer(
        {updateSuccessMessage: null, updateLoading: true, updateError: null},
        {
          type: types.UPDATE_TODO_LIST_SUCCESS,
          payload: {
            successMessage: 'ToDo List Updated!',
          },
        },
      ),
    ).toEqual({
      updateLoading: false,
      updateError: null,
      updateSuccessMessage: 'ToDo List Updated!',
    });
  });

  it('should handle UPDATE_TODO_LIST_FAILURE', () => {
    expect(
      reducer([], {
        type: types.UPDATE_TODO_LIST_FAILURE,
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
          type: types.UPDATE_TODO_LIST_FAILURE,
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
