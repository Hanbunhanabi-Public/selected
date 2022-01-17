import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import expect from 'expect';
import * as actions from '../../src/actions/budget/createBudget';

const middleware = [thunk];
const mockStore = configureMockStore(middleware);
const mockAxios = new MockAdapter(axios);
const store = mockStore({});

describe('add budget actions', () => {
  beforeEach(() => {
    store.clearActions();
  });

  it('creates CREATE_BUDGET_SUCCESS when fetching budget has been done', () => {
    mockAxios.onPost('/budget/add/5e6aeefdb3256d55d6091d82').reply(200, [
      {
        data: 'Budget added.',
      },
    ]);
    return store
      .dispatch(actions.createBudget('5e6aeefdb3256d55d6091d82'))
      .then(() => {
        const expectedActions = [
          {type: actions.CREATE_BUDGET_BEGIN},
          {
            type: actions.CREATE_BUDGET_SUCCESS,
            payload: {
              successMessage: [
                {
                  data: 'Budget added.',
                },
              ],
            },
          },
        ];
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('creates CREATE_BUDGET_FAILURE when fetching budget has failed', () => {
    mockAxios.onPost('/budget/add/5e6aeefdb3256d55d6091d82').reply(500);

    return store
      .dispatch(actions.createBudget('5e6aeefdb3256d55d6091d82'))
      .then(() => {
        const storeActions = store.getActions();
        expect(storeActions[0]).toHaveProperty('type', 'CREATE_BUDGET_BEGIN');
        expect(storeActions[1]).toHaveProperty('type', 'CREATE_BUDGET_FAILURE');
      });
  });
});
