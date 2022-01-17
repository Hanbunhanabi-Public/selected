import reducer from '../../../src/reducers/Budget/deleteExpenses';
import * as types from '../../../src/actions/Budget/deleteExpenses';

describe('deleteExpenses reducer test', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      deleteMessage: '',
      deleting: false,
      error: null,
    });
  });

  it('should handle DELETE_EXPENSES_BEGIN', () => {
    expect(
      reducer([], {
        type: types.DELETE_EXPENSES_BEGIN,
      }),
    ).toEqual({
      deleting: true,
      error: null,
    });
  });

  it('should handle DELETE_EXPENSES_SUCCESS', () => {
    expect(
      reducer([], {
        type: types.DELETE_EXPENSES_SUCCESS,
        payload: {
          data: 'Expenses deleted.',
        },
      }),
    ).toEqual({
      deleting: false,
      deleteMessage: 'Expenses deleted.',
    });
    expect(
      reducer(
        {deleteMessage: '', deleting: true, error: null},
        {
          type: types.DELETE_EXPENSES_SUCCESS,
          payload: {
            data: 'Expenses deleted.',
          },
        },
      ),
    ).toEqual({
      deleting: false,
      error: null,
      deleteMessage: 'Expenses deleted.',
    });
  });

  it('should handle DELETE_EXPENSES_FAILURE', () => {
    expect(
      reducer([], {
        type: types.DELETE_EXPENSES_FAILURE,
        payload: {error: 'Test Error'},
      }),
    ).toEqual({
      deleteMessage: undefined,
      deleting: false,
      error: 'Test Error',
    });
    expect(
      reducer(
        {
          deleting: true,
          error: null,
        },
        {
          type: types.DELETE_EXPENSES_FAILURE,
          payload: {error: 'Test Error'},
        },
      ),
    ).toEqual({
      deleting: false,

      error: 'Test Error',
    });
  });
});
