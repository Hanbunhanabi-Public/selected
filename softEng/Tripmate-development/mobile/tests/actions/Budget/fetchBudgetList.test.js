import configureMockStore from 'redux-mock-store';
import trunk from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import expect from 'expect';
import * as actions from '../../../src/actions/Budget/fetchBudgetList';
import {url} from '../../../src/utils/globalVars';

const middleware = [trunk];
const mockStore = configureMockStore(middleware);
const mockAxios = new MockAdapter(axios);
const store = mockStore({});

describe('fetch budget list actions', () => {
  beforeEach(() => {
    store.clearActions();
  });

  it('creates GET_BUDGET_LIST_SUCCESS when fetching budget list has been done', () => {
    mockAxios.onGet(url + '/budget/trip/5e6aeefdb3256d55d6091d82').reply(200, [
      {
        _id: '5e4f6675eddfd25ef052f9c0',
        budget: 1234,
        tripId: '5e6aeefdb3256d55d6091d82',
        createdAt: '2020-02-21T05:11:17.039Z',
        updatedAt: '2020-02-21T05:11:17.039Z',
        __v: 0,
      },
    ]);
    return store
      .dispatch(actions.fetchBudgetList('5e6aeefdb3256d55d6091d82'))
      .then(() => {
        const expectedActions = [
          {type: actions.GET_BUDGET_LIST_BEGIN},
          {
            type: actions.GET_BUDGET_LIST_SUCCESS,
            payload: {
              budget: [
                {
                  _id: '5e4f6675eddfd25ef052f9c0',
                  budget: 1234,
                  tripId: '5e6aeefdb3256d55d6091d82',
                  createdAt: '2020-02-21T05:11:17.039Z',
                  updatedAt: '2020-02-21T05:11:17.039Z',
                  __v: 0,
                },
              ],
            },
          },
        ];
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('creates GET_BUDGET_LIST_FAILURE when fetching budget list has failed', () => {
    mockAxios.onGet(url + '/budget/trip/5e6aeefdb3256d55d6091d82').reply(500);

    return store
      .dispatch(actions.fetchBudgetList('5e6aeefdb3256d55d6091d82'))
      .then(() => {
        const storeActions = store.getActions();
        expect(storeActions[0]).toHaveProperty('type', 'GET_BUDGET_LIST_BEGIN');
        expect(storeActions[1]).toHaveProperty(
          'type',
          'GET_BUDGET_LIST_FAILURE',
        );
      });
  });
});
