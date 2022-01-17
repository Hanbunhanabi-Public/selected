import configureMockStore from 'redux-mock-store';
import trunk from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import expect from 'expect';
import * as actions from '../../../src/actions/Budget/fetchExpenses';
import {url} from '../../../src/utils/globalVars';

const middleware = [trunk];
const mockStore = configureMockStore(middleware);
const mockAxios = new MockAdapter(axios);
const store = mockStore({});

describe('fetch expenses actions', () => {
  beforeEach(() => {
    store.clearActions();
  });

  it('creates GET_EXPENSES_SUCCESS when fetching expenses has been done', () => {
    mockAxios
      .onGet(
        url +
          '/budget/5e6aadb4160a6405089090ec/expenses/5e6b0b033c476410c04e0047',
      )
      .reply(200, {
        _id: '5e6b0b033c476410c04e0047',
        name: 'Test',
        amount: 90,
        isDone: false,
        date: '2020-01-01T00:00:00.000Z',
        createdAt: '2020-03-13T04:24:35.862Z',
        updatedAt: '2020-03-13T04:24:35.862Z',
      });
    return store
      .dispatch(
        actions.fetchExpenses(
          '5e6aadb4160a6405089090ec',
          '5e6b0b033c476410c04e0047',
        ),
      )
      .then(() => {
        const expectedActions = [
          {type: actions.GET_EXPENSES_BEGIN},
          {
            type: actions.GET_EXPENSES_SUCCESS,
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
        ];
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('creates GET_EXPENSES_FAILURE when fetching expenses has failed', () => {
    mockAxios
      .onGet(
        url +
          '/budget/5e6aadb4160a6405089090ec/expenses/5e6b0b033c476410c04e0047',
      )
      .reply(500);

    return store
      .dispatch(
        actions.fetchExpenses(
          '5e6aadb4160a6405089090ec',
          '5e6b0b033c476410c04e0047',
        ),
      )
      .then(() => {
        const storeActions = store.getActions();
        expect(storeActions[0]).toHaveProperty('type', 'GET_EXPENSES_BEGIN');
        expect(storeActions[1]).toHaveProperty('type', 'GET_EXPENSES_FAILURE');
      });
  });
});
