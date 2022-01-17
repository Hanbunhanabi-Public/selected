import reducer from '../../../src/reducers/Budget/addExpenses';
import * as types from '../../../src/actions/Budget/addExpenses';

describe('addExpensesList reducer test', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      successMessage: '',
      uploading: false,
      error: null,
    });
  });

  it('should handle ADD_EXPENSES_BEGIN', () => {
    expect(
      reducer([], {
        type: types.ADD_EXPENSES_BEGIN,
      }),
    ).toEqual({
      uploading: true,
      error: null,
    });
  });

  it('should handle ADD_EXPENSES_SUCCESS', () => {
    expect(
      reducer([], {
        type: types.ADD_EXPENSES_SUCCESS,
        payload: {
          data: 'Expenses added.',
        },
      }),
    ).toEqual({
      uploading: false,
      successMessage: 'Expenses added.',
    });
    expect(
      reducer(
        {successMessage: '', uploading: true, error: null},
        {
          type: types.ADD_EXPENSES_SUCCESS,
          payload: {
            data: 'Expenses added.',
          },
        },
      ),
    ).toEqual({
      uploading: false,
      error: null,
      successMessage: 'Expenses added.',
    });
  });

  it('should handle ADD_EXPENSES_FAILURE', () => {
    expect(
      reducer([], {
        type: types.ADD_EXPENSES_FAILURE,
        payload: {error: 'Test Error'},
      }),
    ).toEqual({
      uploading: false,

      error: 'Test Error',
    });
    expect(
      reducer(
        {
          uploading: true,
          error: null,
        },
        {
          type: types.ADD_EXPENSES_FAILURE,
          payload: {error: 'Test Error'},
        },
      ),
    ).toEqual({
      uploading: false,

      error: 'Test Error',
    });
  });
});
