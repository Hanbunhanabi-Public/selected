import reducer from '../../src/reducers/todo/createToDoList';
import * as types from '../../src/actions/todo/createToDoList';

describe('createToDoList reducer test', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      createSuccessMessage: null,
      createLoading: false,
      createError: null,
    });
  });

  it('should handle CREATE_TODO_LIST_BEGIN', () => {
    expect(
      reducer([], {
        type: types.CREATE_TODO_LIST_BEGIN,
      }),
    ).toEqual({
      createLoading: true,
      createError: null,
    });
  });

  it('should handle CREATE_TODO_LIST_SUCCESS', () => {
    expect(
      reducer([], {
        type: types.CREATE_TODO_LIST_SUCCESS,
        payload: {
          successMessage: 'New ToDo List Added!',
        },
      }),
    ).toEqual({
      createLoading: false,
      createSuccessMessage: 'New ToDo List Added!',
    });
    expect(
      reducer(
        {createSuccessMessage: null, createLoading: true, createError: null},
        {
          type: types.CREATE_TODO_LIST_SUCCESS,
          payload: {
            successMessage: 'New ToDo List Added!',
          },
        },
      ),
    ).toEqual({
      createLoading: false,
      createError: null,
      createSuccessMessage: 'New ToDo List Added!',
    });
  });

  it('should handle CREATE_TODO_LIST_FAILURE', () => {
    expect(
      reducer([], {
        type: types.CREATE_TODO_LIST_FAILURE,
        payload: {error: 'Test Error'},
      }),
    ).toEqual({
      createLoading: false,
      createError: 'Test Error',
      createSuccessMessage: null,
    });
    expect(
      reducer(
        {
          createLoading: true,
          createError: null,
        },
        {
          type: types.CREATE_TODO_LIST_FAILURE,
          payload: {error: 'Test Error'},
        },
      ),
    ).toEqual({
      createSuccessMessage: null,
      createLoading: false,
      createError: 'Test Error',
    });
  });
});
