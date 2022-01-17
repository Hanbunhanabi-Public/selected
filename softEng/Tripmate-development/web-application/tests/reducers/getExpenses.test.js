import reducer from '../../src/reducers/expense/getExpenses';
import * as types from '../../src/actions/expense/fetchExpenses';

describe('expenses reducer test', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      expenses: {},
      loading: true,
      error: null,
    });
  });

  it('should handle GET_EXPENSES_BEGIN', () => {
    expect(
      reducer([], {
        type: types.GET_EXPENSES_BEGIN,
      }),
    ).toEqual({
      loading: true,
      error: null,
    });
  });

  it('should handle GET_EXPENSES_SUCCESS', () => {
    expect(
      reducer([], {
        type: types.GET_EXPENSES_SUCCESS,
        payload: {
          expenses: {
            _id: '5e6b0b033c476410c04e0047',
            name: 'Test',
            amount: 90,
            isDone: false,
            date: '2020-01-01T00:00:00.000Z',
            createdAt: '2020-03-13T04:24:35.862Z',
            updatedAt: '2020-03-13T04:24:35.862Z',
          },
        },
      }),
    ).toEqual({
      expenses: {
        _id: '5e6b0b033c476410c04e0047',
        name: 'Test',
        amount: 90,
        isDone: false,
        date: '2020-01-01T00:00:00.000Z',
        createdAt: '2020-03-13T04:24:35.862Z',
        updatedAt: '2020-03-13T04:24:35.862Z',
      },
      loading: false,
    });
    expect(
      reducer(
        {expenses: {}, loading: true, error: null},
        {
          type: types.GET_EXPENSES_SUCCESS,
          payload: {
            expenses: {
              _id: '5e6b0b033c476410c04e0047',
              name: 'Test',
              amount: 90,
              isDone: false,
              date: '2020-01-01T00:00:00.000Z',
              createdAt: '2020-03-13T04:24:35.862Z',
              updatedAt: '2020-03-13T04:24:35.862Z',
            },
          },
        },
      ),
    ).toEqual({
      expenses: {
        _id: '5e6b0b033c476410c04e0047',
        name: 'Test',
        amount: 90,
        isDone: false,
        date: '2020-01-01T00:00:00.000Z',
        createdAt: '2020-03-13T04:24:35.862Z',
        updatedAt: '2020-03-13T04:24:35.862Z',
      },

      loading: false,
      error: null,
    });
  });

  it('should handle GET_EXPENSES_FAILURE', () => {
    expect(
      reducer([], {
        type: types.GET_EXPENSES_FAILURE,
        payload: {error: 'Test Error'},
      }),
    ).toEqual({
      expenses: {},
      loading: false,
      error: 'Test Error',
    });
    expect(
      reducer(
        {
          expenses: {},
          loading: true,
          error: null,
        },
        {
          type: types.GET_EXPENSES_FAILURE,
          payload: {error: 'Test Error'},
        },
      ),
    ).toEqual({
      expenses: {},
      loading: false,
      error: 'Test Error',
    });
  });
});
