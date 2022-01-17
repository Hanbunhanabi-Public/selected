import reducer from '../../../src/reducers/Todo/createToDoItem';
import * as types from '../../../src/actions/Todo/createToDoItem';

describe('createToDoItem reducer test', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      createSuccessMessage: null,
      createLoading: false,
      createError: null,
    });
  });

  it('should handle CREATE_TODO_ITEM_BEGIN', () => {
    expect(
      reducer([], {
        type: types.CREATE_TODO_ITEM_BEGIN,
      }),
    ).toEqual({
      createLoading: true,
      createError: null,
    });
  });

  it('should handle CREATE_TODO_ITEM_SUCCESS', () => {
    expect(
      reducer([], {
        type: types.CREATE_TODO_ITEM_SUCCESS,
        payload: {
          successMessage: 'New ToDo Item Added!',
        },
      }),
    ).toEqual({
      createLoading: false,
      createSuccessMessage: 'New ToDo Item Added!',
    });
    expect(
      reducer(
        {createSuccessMessage: null, createLoading: true, createError: null},
        {
          type: types.CREATE_TODO_ITEM_SUCCESS,
          payload: {
            successMessage: 'New ToDo Item Added!',
          },
        },
      ),
    ).toEqual({
      createLoading: false,
      createError: null,
      createSuccessMessage: 'New ToDo Item Added!',
    });
  });

  it('should handle CREATE_TODO_ITEM_FAILURE', () => {
    expect(
      reducer([], {
        type: types.CREATE_TODO_ITEM_FAILURE,
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
          type: types.CREATE_TODO_ITEM_FAILURE,
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
