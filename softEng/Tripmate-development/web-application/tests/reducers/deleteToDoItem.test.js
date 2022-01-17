import reducer from '../../src/reducers/todo/deleteToDoItem';
import * as types from '../../src/actions/todo/deleteToDoItem';

describe('deleteToDoItem reducer test', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      deleteSuccessMessage: null,
      deleteLoading: true,
      deleteError: null,
    });
  });

  it('should handle DELETE_TODO_ITEM_BEGIN', () => {
    expect(
      reducer([], {
        type: types.DELETE_TODO_ITEM_BEGIN,
      }),
    ).toEqual({
      deleteLoading: true,
      deleteError: null,
    });
  });

  it('should handle DELETE_TODO_ITEM_SUCCESS', () => {
    expect(
      reducer([], {
        type: types.DELETE_TODO_ITEM_SUCCESS,
        payload: {
          successMessage: 'ToDo Item Deleted.',
        },
      }),
    ).toEqual({
      deleteLoading: false,
      deleteSuccessMessage: 'ToDo Item Deleted.',
    });
    expect(
      reducer(
        {deleteSuccessMessage: null, deleteLoading: true, deleteError: null},
        {
          type: types.DELETE_TODO_ITEM_SUCCESS,
          payload: {
            successMessage: 'ToDo Item Deleted.',
          },
        },
      ),
    ).toEqual({
      deleteLoading: false,
      deleteError: null,
      deleteSuccessMessage: 'ToDo Item Deleted.',
    });
  });

  it('should handle DELETE_TODO_ITEM_FAILURE', () => {
    expect(
      reducer([], {
        type: types.DELETE_TODO_ITEM_FAILURE,
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
          type: types.DELETE_TODO_ITEM_FAILURE,
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
