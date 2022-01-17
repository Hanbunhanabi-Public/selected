import reducer from '../../src/reducers/budget/createBudget';
import * as types from '../../src/actions/budget/createBudget';

// TODO: finish these tests
describe('createBudget reducer test', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      createSuccessMessage: [],
      createLoading: true,
      createError: null,
    });
  });

  it('should handle CREATE_BUDGET_BEGIN', () => {
    expect(
      reducer([], {
        type: types.CREATE_BUDGET_BEGIN,
      }),
    ).toEqual({
      createLoading: true,
      createError: null,
    });
  });

  it('should handle CREATE_BUDGET_SUCCESS', () => {
    expect(
      reducer([], {
        type: types.CREATE_BUDGET_SUCCESS,
        payload: {
          successMessage: {
            data: 'Budget added.',
          },
        },
      }),
    ).toEqual({
      createLoading: false,
      createSuccessMessage: {data: 'Budget added.'},
    });
    expect(
      reducer(
        {createSuccessMessage: [], createLoading: true, createError: null},
        {
          type: types.CREATE_BUDGET_SUCCESS,
          payload: {
            successMessage: {
              data: 'Budget added.',
            },
          },
        },
      ),
    ).toEqual({
      createLoading: false,
      createError: null,
      createSuccessMessage: {data: 'Budget added.'},
    });
  });

  it('should handle CREATE_BUDGET_FAILURE', () => {
    expect(
      reducer([], {
        type: types.CREATE_BUDGET_FAILURE,
        payload: {error: 'Test Error'},
      }),
    ).toEqual({
      createLoading: false,
      createError: 'Test Error',
      createSuccessMessage: [],
    });
    expect(
      reducer(
        {
          createLoading: true,
          createError: null,
        },
        {
          type: types.CREATE_BUDGET_FAILURE,
          payload: {error: 'Test Error'},
        },
      ),
    ).toEqual({
      createSuccessMessage: [],
      createLoading: false,
      createError: 'Test Error',
    });
  });
});
