import configureMockStore from 'redux-mock-store';
import trunk from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import expect from 'expect';
import * as actions from '../../src/actions/expense/updateExpenses';

const middleware = [trunk];
const mockStore = configureMockStore(middleware);
const mockAxios = new MockAdapter(axios);
const store = mockStore({});

describe('update expenses actions', () => {
  beforeEach(() => {
    store.clearActions();
  });
  const targetExpenses = {
    _id: '5e6b0b033c476410c04e0047',
    name: 'Test',
    amount: 90,
    isDone: false,
    date: '2020-01-01T00:00:00.000Z',
    createdAt: '2020-03-13T04:24:35.862Z',
    updatedAt: '2020-03-13T04:24:35.862Z',
  };

  const newExpenses = {
    _id: '5e6b0b033c476410c04e0047',
    name: 'Test',
    amount: 900,
    isDone: true,
    date: '2020-01-01T00:00:00.000Z',
    createdAt: '2020-03-13T04:24:35.862Z',
    updatedAt: '2020-03-13T04:24:35.862Z',
  };

  it('creates UPDATE_EXPENSES_SUCCESS when update expenses has been done', () => {
    mockAxios
      .onPost(
        `/budget/e6aadb4160a6405089090ec/expenses/update/${targetExpenses._id}`,
      )
      .reply(200, [
        {
          data: 'Expenses updated.',
        },
      ]);
    return store
      .dispatch(
        actions.updateExpenses(
          'e6aadb4160a6405089090ec',
          targetExpenses._id,
          newExpenses,
        ),
      )
      .then(() => {
        const expectedActions = [
          {type: actions.UPDATE_EXPENSES_BEGIN},
          {
            type: actions.UPDATE_EXPENSES_SUCCESS,
            payload: {
              successMessage: [
                {
                  data: 'Expenses updated.',
                },
              ],
            },
          },
        ];
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('creates UPDATE_EXPENSES_FAILURE when update expenses has failed', () => {
    mockAxios
      .onPost(
        `/budget/e6aadb4160a6405089090ec/expenses/update/${targetExpenses._id}`,
      )
      .reply(500);

    return store
      .dispatch(
        actions.updateExpenses(
          'e6aadb4160a6405089090ec',
          targetExpenses._id,
          newExpenses,
        ),
      )
      .then(() => {
        const storeActions = store.getActions();
        expect(storeActions[0]).toHaveProperty('type', 'UPDATE_EXPENSES_BEGIN');
        expect(storeActions[1]).toHaveProperty(
          'type',
          'UPDATE_EXPENSES_FAILURE',
        );
      });
  });
});
