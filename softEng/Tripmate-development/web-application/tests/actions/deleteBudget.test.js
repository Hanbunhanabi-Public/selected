import configureMockStore from 'redux-mock-store';
import trunk from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import expect from 'expect';
import * as actions from '../../src/actions/budget/deleteBudget';

const middleware = [trunk];
const mockStore = configureMockStore(middleware);
const mockAxios = new MockAdapter(axios);
const store = mockStore({});

const budget = {
  _id: '5e4f6675eddfd25ef052f9c0',
  budget: 1234,
  createdAt: '2020-02-21T05:11:17.039Z',
  updatedAt: '2020-02-21T05:11:17.039Z',
  __v: 0,
};

describe('delete budget actions', () => {
  beforeEach(() => {
    store.clearActions();
  });

  it('creates DELETE_BUDGET_SUCCESS when delete budget has been done', () => {
    mockAxios
      .onDelete(`/budget/${budget._id}`)
      .reply(200, [{data: 'Budget deleted.'}]);
    return store.dispatch(actions.deleteBudget(budget)).then(() => {
      const expectedActions = [
        {type: actions.DELETE_BUDGET_BEGIN},
        {
          type: actions.DELETE_BUDGET_SUCCESS,
          payload: {
            deleteSuccessMessage: [{data: 'Budget deleted.'}],
          },
        },
      ];
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('creates DELETE_BUDGET_FAILURE when delete budget has failed', () => {
    mockAxios.onDelete(`/budget/${budget._id}`).reply(500);

    return store.dispatch(actions.deleteBudget(budget)).then(() => {
      const storeActions = store.getActions();
      expect(storeActions[0]).toHaveProperty('type', 'DELETE_BUDGET_BEGIN');
      expect(storeActions[1]).toHaveProperty('type', 'DELETE_BUDGET_FAILURE');
    });
  });
});
