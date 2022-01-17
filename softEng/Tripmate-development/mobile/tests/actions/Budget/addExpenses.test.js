import configureMockStore from 'redux-mock-store';
import trunk from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import expect from 'expect';
import * as actions from '../../../src/actions/Budget/addExpenses';
import {url} from '../../../src/utils/globalVars';

const middleware = [trunk];
const mockStore = configureMockStore(middleware);
const mockAxios = new MockAdapter(axios);
const store = mockStore({});

describe('add expenses actions', () => {
  beforeEach(() => {
    store.clearActions();
  });
  it('creates ADD_EXPENSES_SUCCESS when fetching budget has been done', () => {
    mockAxios
      .onPost(url + '/budget/5e6aadb4160a6405089090ec/expenses/add')
      .reply(200, [
        {
          data: 'expenses added.',
        },
      ]);
    return store
      .dispatch(
        actions.addExpenses('5e6aadb4160a6405089090ec', {
          name: 'test',
          amount: 500,
          Date: '2020-05-01',
          isDone: false,
        }),
      )
      .then(() => {
        const expectedActions = [
          {type: actions.ADD_EXPENSES_BEGIN},
          {
            type: actions.ADD_EXPENSES_SUCCESS,
            payload: {
              successMessage: [
                {
                  data: 'expenses added.',
                },
              ],
            },
          },
        ];
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('creates ADD_EXPENSES_FAILURE when fetching budget has failed', () => {
    mockAxios
      .onPost(url + '/budget/5e6aadb4160a6405089090ec/expenses/add')
      .reply(500);

    return store.dispatch(actions.addExpenses()).then(() => {
      const storeActions = store.getActions();
      expect(storeActions[0]).toHaveProperty('type', 'ADD_EXPENSES_BEGIN');
      expect(storeActions[1]).toHaveProperty('type', 'ADD_EXPENSES_FAILURE');
    });
  });
});
