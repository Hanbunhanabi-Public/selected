import configureMockStore from 'redux-mock-store';
import trunk from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import expect from 'expect';
import * as actions from '../../../src/actions/Budget/fetchExpenseSummary';
import {url} from '../../../src/utils/globalVars';

const middleware = [trunk];
const mockStore = configureMockStore(middleware);
const mockAxios = new MockAdapter(axios);
const store = mockStore({});

describe('fetch expenses summary actions', () => {
  beforeEach(() => {
    store.clearActions();
  });

  it('creates GET_EXPENSE_SUMMARY_SUCCESS when fetching expense summary has been done', () => {
    mockAxios
      .onGet(url + '/budget/5e6aadb4160a6405089090ec/expenses/summary')
      .reply(200, [
        {
          available: 1000,
          planned: 990,
          budget: 0,
          pending: 990,
          used: 0,
        },
      ]);
    return store
      .dispatch(actions.fetchExpenseSummary('5e6aadb4160a6405089090ec'))
      .then(() => {
        const expectedActions = [
          {type: actions.GET_EXPENSE_SUMMARY_BEGIN},
          {
            type: actions.GET_EXPENSE_SUMMARY_SUCCESS,
            payload: {
              summary: [
                {
                  available: 1000,
                  planned: 990,
                  budget: 0,
                  pending: 990,
                  used: 0,
                },
              ],
            },
          },
        ];
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('creates GET_EXPENSE_SUMMARY_FAILURE when fetching expense summary has failed', () => {
    mockAxios
      .onGet(url + '/budget/5e6aadb4160a6405089090ec/expenses/summary')
      .reply(500);

    return store
      .dispatch(actions.fetchExpenseSummary('5e6aadb4160a6405089090ec'))
      .then(() => {
        const storeActions = store.getActions();
        expect(storeActions[0]).toHaveProperty(
          'type',
          'GET_EXPENSE_SUMMARY_BEGIN',
        );
        expect(storeActions[1]).toHaveProperty(
          'type',
          'GET_EXPENSE_SUMMARY_FAILURE',
        );
      });
  });
});
