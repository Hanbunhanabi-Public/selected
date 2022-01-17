import reducer from '../../src/reducers/todo/updateToDoItem';
import * as types from '../../src/actions/todo/updateToDoItem';

describe('updateToDoItem reducer test', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      updateSuccessMessage: null,
      updateLoading: true,
      updateError: null,
    });
  });

  it('should handle UPDATE_TODO_ITEM_BEGIN', () => {
    expect(
      reducer([], {
        type: types.UPDATE_TODO_ITEM_BEGIN,
      }),
    ).toEqual({
      updateLoading: true,
      updateError: null,
    });
  });

  it('should handle UPDATE_TODO_ITEM_SUCCESS', () => {
    expect(
      reducer([], {
        type: types.UPDATE_TODO_ITEM_SUCCESS,
        payload: {
          successMessage: 'ToDo Item Updated!',
        },
      }),
    ).toEqual({
      updateLoading: false,
      updateSuccessMessage: 'ToDo Item Updated!',
    });
    expect(
      reducer(
        {updateSuccessMessage: null, updateLoading: true, updateError: null},
        {
          type: types.UPDATE_TODO_ITEM_SUCCESS,
          payload: {
            successMessage: 'ToDo Item Updated!',
          },
        },
      ),
    ).toEqual({
      updateLoading: false,
      updateError: null,
      updateSuccessMessage: 'ToDo Item Updated!',
    });
  });

  it('should handle UPDATE_TODO_ITEM_FAILURE', () => {
    expect(
      reducer([], {
        type: types.UPDATE_TODO_ITEM_FAILURE,
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
          type: types.UPDATE_TODO_ITEM_FAILURE,
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
