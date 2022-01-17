import configureMockStore from 'redux-mock-store';
import trunk from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import expect from 'expect';
import * as actions from '../../../src/actions/Budget/fetchExpensesList';
import {url} from '../../../src/utils/globalVars';

const middleware = [trunk];
const mockStore = configureMockStore(middleware);
const mockAxios = new MockAdapter(axios);
const store = mockStore({});

describe('fetch expenses list actions', () => {
  beforeEach(() => {
    store.clearActions();
  });

  it('creates GET_EXPENSES_LIST_SUCCESS when fetching expenses list has been done', () => {
    mockAxios
      .onGet(url + '/budget/5e6aadb4160a6405089090ec/expenses/sorted')
      .reply(200, [
        {
          _id: '5e6b0b033c476410c04e0047',
          name: 'Test',
          amount: 90,
          isDone: false,
          date: '2020-01-01T00:00:00.000Z',
          createdAt: '2020-03-13T04:24:35.862Z',
          updatedAt: '2020-03-13T04:24:35.862Z',
        },
        {
          _id: '5e6b0b133c476410c04e0049',
          name: 'Test2',
          amount: 900,
          isDone: false,
          date: '2020-01-01T00:00:00.000Z',
          createdAt: '2020-03-13T04:24:51.066Z',
          updatedAt: '2020-03-13T04:24:51.066Z',
        },
      ]);
    return store
      .dispatch(actions.fetchExpensesList('5e6aadb4160a6405089090ec'))
      .then(() => {
        const expectedActions = [
          {type: actions.GET_EXPENSES_LIST_BEGIN},
          {
            type: actions.GET_EXPENSES_LIST_SUCCESS,
            payload: {
              expensesList: [
                {
                  _id: '5e6b0b033c476410c04e0047',
                  name: 'Test',
                  amount: 90,
                  isDone: false,
                  date: '2020-01-01T00:00:00.000Z',
                  createdAt: '2020-03-13T04:24:35.862Z',
                  updatedAt: '2020-03-13T04:24:35.862Z',
                },
                {
                  _id: '5e6b0b133c476410c04e0049',
                  name: 'Test2',
                  amount: 900,
                  isDone: false,
                  date: '2020-01-01T00:00:00.000Z',
                  createdAt: '2020-03-13T04:24:51.066Z',
                  updatedAt: '2020-03-13T04:24:51.066Z',
                },
              ],
            },
          },
        ];
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('creates GET_EXPENSES_LIST_FAILURE when fetching expenses has failed', () => {
    mockAxios
      .onGet(url + '/budget/5e6aadb4160a6405089090ec/expenses/sorted')
      .reply(500);

    return store
      .dispatch(actions.fetchExpensesList('5e6aadb4160a6405089090ec'))
      .then(() => {
        const storeActions = store.getActions();
        expect(storeActions[0]).toHaveProperty(
          'type',
          'GET_EXPENSES_LIST_BEGIN',
        );
        expect(storeActions[1]).toHaveProperty(
          'type',
          'GET_EXPENSES_LIST_FAILURE',
        );
      });
  });
});
