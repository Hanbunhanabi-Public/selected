import reducer from '../../../src/reducers/Budget/getExpenseSummary';
import * as types from '../../../src/actions/Budget/fetchExpenseSummary';

describe('getExpenseSummary reducer test', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      summary: {},
      summaryLoading: false,
      summaryError: null,
    });
  });

  it('should handle GET_EXPENSE_SUMMARY_BEGIN', () => {
    expect(
      reducer(
        {},
        {
          type: types.GET_EXPENSE_SUMMARY_BEGIN,
        },
      ),
    ).toEqual({
      summaryLoading: true,
      summaryError: null,
    });
  });

  it('should handle GET_EXPENSE_SUMMARY_SUCCESS', () => {
    expect(
      reducer(
        {},
        {
          type: types.GET_EXPENSE_SUMMARY_SUCCESS,
          payload: {
            summary: {
              available: 1000,
              planned: 990,
              budget: 0,
              pending: 990,
              used: 0,
            },
          },
        },
      ),
    ).toEqual({
      summary: {
        available: 1000,
        planned: 990,
        budget: 0,
        pending: 990,
        used: 0,
      },
      summaryLoading: false,
    });
    expect(
      reducer(
        {summary: {}, summaryLoading: true, summaryError: null},
        {
          type: types.GET_EXPENSE_SUMMARY_SUCCESS,
          payload: {
            summary: {
              available: 1000,
              planned: 990,
              budget: 0,
              pending: 990,
              used: 0,
            },
          },
        },
      ),
    ).toEqual({
      summary: {
        available: 1000,
        planned: 990,
        budget: 0,
        pending: 990,
        used: 0,
      },
      summaryLoading: false,
      summaryError: null,
    });
  });

  it('should handle GET_EXPENSE_SUMMARY_FAILURE', () => {
    expect(
      reducer(
        {},
        {
          type: types.GET_EXPENSE_SUMMARY_FAILURE,
          payload: {error: 'Test Error'},
        },
      ),
    ).toEqual({
      summary: {},
      summaryLoading: false,
      summaryError: 'Test Error',
    });
    expect(
      reducer(
        {
          summary: {},
          summaryLoading: true,
          summaryError: null,
        },
        {
          type: types.GET_EXPENSE_SUMMARY_FAILURE,
          payload: {error: 'Test Error'},
        },
      ),
    ).toEqual({
      summary: {},
      summaryLoading: false,
      summaryError: 'Test Error',
    });
  });
});
