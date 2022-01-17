import reducer from '../../../src/reducers/Budget/updateExpenses';
import * as types from '../../../src/actions/Budget/updateExpenses';

describe('updateExpenses reducer test', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      successMessage: '',
      uploading: false,
      error: null,
    });
  });

  it('should handle UPDATE_EXPENSES_BEGIN', () => {
    expect(
      reducer([], {
        type: types.UPDATE_EXPENSES_BEGIN,
      }),
    ).toEqual({
      uploading: true,
      error: null,
    });
  });

  it('should handle UPDATE_EXPENSES_SUCCESS', () => {
    expect(
      reducer([], {
        type: types.UPDATE_EXPENSES_SUCCESS,
        payload: {
          data: 'Expenses updated.',
        },
      }),
    ).toEqual({
      uploading: false,
      successMessage: 'Expenses updated.',
    });
    expect(
      reducer(
        {successMessage: '', uploading: true, error: null},
        {
          type: types.UPDATE_EXPENSES_SUCCESS,
          payload: {
            data: 'Expenses updated.',
          },
        },
      ),
    ).toEqual({
      uploading: false,
      error: null,
      successMessage: 'Expenses updated.',
    });
  });

  it('should handle UPDATE_EXPENSES_FAILURE', () => {
    expect(
      reducer([], {
        type: types.UPDATE_EXPENSES_FAILURE,
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
          type: types.UPDATE_EXPENSES_FAILURE,
          payload: {error: 'Test Error'},
        },
      ),
    ).toEqual({
      uploading: false,

      error: 'Test Error',
    });
  });
});
