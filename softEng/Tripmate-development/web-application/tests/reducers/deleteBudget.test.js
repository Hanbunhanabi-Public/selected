import reducer from '../../src/reducers/budget/deleteBudget';
import * as types from '../../src/actions/budget/deleteBudget';

describe('deleteBudgetList reducer test', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      deleteMessage: '',
      deleting: true,
      error: null,
    });
  });

  it('should handle DELETE_BUDGET_BEGIN', () => {
    expect(
      reducer([], {
        type: types.DELETE_BUDGET_BEGIN,
      }),
    ).toEqual({
      deleting: true,
      error: null,
    });
  });

  it('should handle DELETE_BUDGET_SUCCESS', () => {
    expect(
      reducer([], {
        type: types.DELETE_BUDGET_SUCCESS,
        payload: {
          data: 'Budget deleted.',
        },
      }),
    ).toEqual({
      deleting: false,
      deleteMessage: 'Budget deleted.',
    });
    expect(
      reducer(
        {deleteMessage: '', deleting: true, error: null},
        {
          type: types.DELETE_BUDGET_SUCCESS,
          payload: {
            data: 'Budget deleted.',
          },
        },
      ),
    ).toEqual({
      deleting: false,
      error: null,
      deleteMessage: 'Budget deleted.',
    });
  });

  it('should handle DELETE_BUDGET_FAILURE', () => {
    expect(
      reducer([], {
        type: types.DELETE_BUDGET_FAILURE,
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
          type: types.DELETE_BUDGET_FAILURE,
          payload: {error: 'Test Error'},
        },
      ),
    ).toEqual({
      deleting: false,
      error: 'Test Error',
    });
  });
});
