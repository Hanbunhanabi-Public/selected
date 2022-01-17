import configureMockStore from 'redux-mock-store';
import trunk from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import expect from 'expect';
import * as actions from '../../src/actions/budget/updateBudget';

const middleware = [trunk];
const mockStore = configureMockStore(middleware);
const mockAxios = new MockAdapter(axios);
const store = mockStore({});

describe('update budget actions', () => {
  beforeEach(() => {
    store.clearActions();
  });
  it('creates UPDATE_BUDGET_SUCCESS when update budget has been done', () => {
    mockAxios.onPost('/budget/5e4f6675eddfd25ef052f9c0/update').reply(200, [
      {
        data: 'Budget updated.',
      },
    ]);
    return store
      .dispatch(actions.updateBudget('5e4f6675eddfd25ef052f9c0', 60))
      .then(() => {
        const expectedActions = [
          {type: actions.UPDATE_BUDGET_BEGIN},
          {
            type: actions.UPDATE_BUDGET_SUCCESS,
            payload: {
              successMessage: [
                {
                  data: 'Budget updated.',
                },
              ],
            },
          },
        ];
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('creates UPDATE_BUDGET_FAILURE when update budget has failed', () => {
    mockAxios.onPost('/budget/update').reply(500);

    return store.dispatch(actions.updateBudget()).then(() => {
      const storeActions = store.getActions();
      expect(storeActions[0]).toHaveProperty('type', 'UPDATE_BUDGET_BEGIN');
      expect(storeActions[1]).toHaveProperty('type', 'UPDATE_BUDGET_FAILURE');
    });
  });
});
