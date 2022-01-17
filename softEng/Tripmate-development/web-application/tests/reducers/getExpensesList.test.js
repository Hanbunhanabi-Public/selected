import reducer from '../../src/reducers/event/getExpensesList';
import * as types from '../../src/actions/expense/fetchExpensesList';

describe('getExpensesList reducer test', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      expensesList: [],
      loading: true,
      error: null,
    });
  });

  it('should handle GET_EXPENSES_LIST_BEGIN', () => {
    expect(
      reducer([], {
        type: types.GET_EXPENSES_LIST_BEGIN,
      }),
    ).toEqual({
      loading: true,
      error: null,
    });
  });

  it('should handle GET_EXPENSES_LIST_SUCCESS', () => {
    expect(
      reducer([], {
        type: types.GET_EXPENSES_LIST_SUCCESS,
        payload: {
          expensesList: [
            {
              name: 'Test expense',
              amount: 123,
              isDone: false,
              date: '2020-01-01',
            },
            {
              name: 'Test expense',
              amount: 123,
              isDone: true,
              date: '2020-01-01',
            },
            {
              name: 'Test expense',
              amount: 123,
              isDone: false,
              date: '2020-01-02',
            },
          ],
        },
      }),
    ).toEqual({
      expensesList: [
        {
          name: 'Test expense',
          amount: 123,
          isDone: false,
          date: '2020-01-01',
        },
        {
          name: 'Test expense',
          amount: 123,
          isDone: true,
          date: '2020-01-01',
        },
        {
          name: 'Test expense',
          amount: 123,
          isDone: false,
          date: '2020-01-02',
        },
      ],
      loading: false,
    });
    expect(
      reducer(
        {expensesList: [], loading: true, error: null},
        {
          type: types.GET_EXPENSES_LIST_SUCCESS,
          payload: {
            expensesList: [
              {
                name: 'Test expense',
                amount: 123,
                isDone: false,
                date: '2020-01-01',
              },
              {
                name: 'Test expense',
                amount: 123,
                isDone: true,
                date: '2020-01-01',
              },
              {
                name: 'Test expense',
                amount: 123,
                isDone: false,
                date: '2020-01-02',
              },
            ],
          },
        },
      ),
    ).toEqual({
      expensesList: [
        {
          name: 'Test expense',
          amount: 123,
          isDone: false,
          date: '2020-01-01',
        },
        {
          name: 'Test expense',
          amount: 123,
          isDone: true,
          date: '2020-01-01',
        },
        {
          name: 'Test expense',
          amount: 123,
          isDone: false,
          date: '2020-01-02',
        },
      ],
      loading: false,
      error: null,
    });
  });

  it('should handle GET_EXPENSES_LIST_FAILURE', () => {
    expect(
      reducer([], {
        type: types.GET_EXPENSES_LIST_FAILURE,
        payload: {error: 'Test Error'},
      }),
    ).toEqual({
      expensesList: [],
      loading: false,
      error: 'Test Error',
    });
    expect(
      reducer(
        {
          expensesList: [],
          loading: true,
          error: null,
        },
        {
          type: types.GET_EXPENSES_LIST_FAILURE,
          payload: {error: 'Test Error'},
        },
      ),
    ).toEqual({
      expensesList: [],
      loading: false,
      error: 'Test Error',
    });
  });
});
