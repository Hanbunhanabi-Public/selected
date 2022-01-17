import reducer from '../../src/reducers/todo/getToDoList';
import * as types from '../../src/actions/todo/fetchToDoList';

describe('getToDoList reducer test', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      todolist: [],
      loading: true,
      error: null,
    });
  });

  it('should handle GET_TODO_LIST_BEGIN', () => {
    expect(
      reducer([], {
        type: types.GET_TODO_LIST_BEGIN,
      }),
    ).toEqual({
      loading: true,
      error: null,
    });
  });

  it('should handle GET_TODO_LIST_SUCCESS', () => {
    expect(
      reducer([], {
        type: types.GET_TODO_LIST_SUCCESS,
        payload: {todolist: [{name: 'Test ToDo List'}]},
      }),
    ).toEqual({
      todolist: [{name: 'Test ToDo List'}],
      loading: false,
    });
    expect(
      reducer(
        {
          todolist: [],
          loading: true,
          error: null,
        },
        {
          type: types.GET_TODO_LIST_SUCCESS,
          payload: {todolist: [{name: 'Test ToDo List'}]},
        },
      ),
    ).toEqual({
      todolist: [{name: 'Test ToDo List'}],
      loading: false,
      error: null,
    });
  });

  it('should handle GET_TODO_LIST_FAILURE', () => {
    expect(
      reducer([], {
        type: types.GET_TODO_LIST_FAILURE,
        payload: {error: 'Test Error'},
      }),
    ).toEqual({
      todolist: [],
      loading: false,
      error: 'Test Error',
    });
    expect(
      reducer(
        {
          todolist: [],
          loading: true,
          error: null,
        },
        {
          type: types.GET_TODO_LIST_FAILURE,
          payload: {error: 'Test Error'},
        },
      ),
    ).toEqual({
      todolist: [],
      loading: false,
      error: 'Test Error',
    });
  });
});
