import reducer from '../../../src/reducers/Budget/updateBudget';
import * as types from '../../../src/actions/Budget/updateBudget';

describe('update budget reducer test', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      successMessage: '',
      uploading: false,
      error: null,
    });
  });

  it('should handle UPDATE_BUDGET_BEGIN', () => {
    expect(
      reducer([], {
        type: types.UPDATE_BUDGET_BEGIN,
      }),
    ).toEqual({
      uploading: true,
      error: null,
    });
  });

  it('should handle UPDATE_BUDGET_SUCCESS', () => {
    expect(
      reducer([], {
        type: types.UPDATE_BUDGET_SUCCESS,
        payload: {
          data: 'Budget updated.',
        },
      }),
    ).toEqual({
      uploading: false,
      successMessage: 'Budget updated.',
    });
    expect(
      reducer(
        {successMessage: '', uploading: true, error: null},
        {
          type: types.UPDATE_BUDGET_SUCCESS,
          payload: {
            data: 'Budget updated.',
          },
        },
      ),
    ).toEqual({
      uploading: false,
      error: null,
      successMessage: 'Budget updated.',
    });
  });

  it('should handle UPDATE_BUDGET_FAILURE', () => {
    expect(
      reducer([], {
        type: types.UPDATE_BUDGET_FAILURE,
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
          type: types.UPDATE_BUDGET_FAILURE,
          payload: {error: 'Test Error'},
        },
      ),
    ).toEqual({
      uploading: false,

      error: 'Test Error',
    });
  });
});
