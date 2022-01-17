import reducer from '../../../src/reducers/Todo/deleteToDoList';
import * as types from '../../../src/actions/Todo/deleteToDoList';

describe('deleteToDoList reducer test', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      deleteSuccessMessage: null,
      deleteLoading: false,
      deleteError: null,
    });
  });

  it('should handle DELETE_TODO_LIST_BEGIN', () => {
    expect(
      reducer([], {
        type: types.DELETE_TODO_LIST_BEGIN,
      }),
    ).toEqual({
      deleteLoading: true,
      deleteError: null,
    });
  });

  it('should handle DELETE_TODO_LIST_SUCCESS', () => {
    expect(
      reducer([], {
        type: types.DELETE_TODO_LIST_SUCCESS,
        payload: {
          successMessage: 'ToDo List Deleted.',
        },
      }),
    ).toEqual({
      deleteLoading: false,
      deleteSuccessMessage: 'ToDo List Deleted.',
    });
    expect(
      reducer(
        {deleteSuccessMessage: null, deleteLoading: true, deleteError: null},
        {
          type: types.DELETE_TODO_LIST_SUCCESS,
          payload: {
            successMessage: 'ToDo List Deleted.',
          },
        },
      ),
    ).toEqual({
      deleteLoading: false,
      deleteError: null,
      deleteSuccessMessage: 'ToDo List Deleted.',
    });
  });

  it('should handle DELETE_TODO_LIST_FAILURE', () => {
    expect(
      reducer([], {
        type: types.DELETE_TODO_LIST_FAILURE,
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
          type: types.DELETE_TODO_LIST_FAILURE,
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
