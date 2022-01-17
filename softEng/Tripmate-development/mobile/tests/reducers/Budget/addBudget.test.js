import reducer from '../../../src/reducers/Budget/addBudget';
import * as types from '../../../src/actions/Budget/addBudget';

describe('addBudget reducer test', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      successMessage: '',
      uploading: false,
      error: null,
    });
  });

  it('should handle ADD_BUDGET_BEGIN', () => {
    expect(
      reducer([], {
        type: types.ADD_BUDGET_BEGIN,
      }),
    ).toEqual({
      uploading: true,
      error: null,
    });
  });

  it('should handle ADD_BUDGET_SUCCESS', () => {
    expect(
      reducer([], {
        type: types.ADD_BUDGET_SUCCESS,
        payload: {
          data: 'Budget added.',
        },
      }),
    ).toEqual({
      uploading: false,
      successMessage: 'Budget added.',
    });
    expect(
      reducer(
        {successMessage: '', uploading: true, error: null},
        {
          type: types.ADD_BUDGET_SUCCESS,
          payload: {
            data: 'Budget added.',
          },
        },
      ),
    ).toEqual({
      uploading: false,
      error: null,
      successMessage: 'Budget added.',
    });
  });

  it('should handle ADD_BUDGET_FAILURE', () => {
    expect(
      reducer([], {
        type: types.ADD_BUDGET_FAILURE,
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
          type: types.ADD_BUDGET_FAILURE,
          payload: {error: 'Test Error'},
        },
      ),
    ).toEqual({
      uploading: false,

      error: 'Test Error',
    });
  });
});
