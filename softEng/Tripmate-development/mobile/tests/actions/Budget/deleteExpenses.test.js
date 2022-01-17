import configureMockStore from 'redux-mock-store';
import trunk from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import expect from 'expect';
import * as actions from '../../../src/actions/Budget/deleteExpenses';
import {url} from '../../../src/utils/globalVars';

const middleware = [trunk];
const mockStore = configureMockStore(middleware);
const mockAxios = new MockAdapter(axios);
const store = mockStore({});

let expenses = {
  _id: '5e6b0b033c476410c04e0047',
  name: 'Test',
  amount: 90,
  isDone: false,
  date: '2020-01-01T00:00:00.000Z',
  createdAt: '2020-03-13T04:24:35.862Z',
  updatedAt: '2020-03-13T04:24:35.862Z',
};

describe('delete expenses actions', () => {
  beforeEach(() => {
    store.clearActions();
  });

  it('creates DELETE_EXPENSES_SUCCESS when delete expenses has been done', () => {
    mockAxios
      .onDelete(
        url + '/budget/5e4f6675eddfd25ef052f9c0/expenses/' + expenses._id,
      )
      .reply(200, [{data: 'Expenses deleted.'}]);
    return store
      .dispatch(actions.deleteExpenses('5e4f6675eddfd25ef052f9c0', expenses))
      .then(() => {
        const expectedActions = [
          {type: actions.DELETE_EXPENSES_BEGIN},
          {
            type: actions.DELETE_EXPENSES_SUCCESS,
            payload: {
              deleteSuccessMessage: [{data: 'Expenses deleted.'}],
            },
          },
        ];
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('creates DELETE_EXPENSES_FAILURE when delete expenses has failed', () => {
    mockAxios
      .onDelete(
        url + '/budget/5e4f6675eddfd25ef052f9c0/expenses/' + expenses._id,
      )
      .reply(500);

    return store
      .dispatch(actions.deleteExpenses('5e4f6675eddfd25ef052f9c0', expenses))
      .then(() => {
        const storeActions = store.getActions();
        expect(storeActions[0]).toHaveProperty('type', 'DELETE_EXPENSES_BEGIN');
        expect(storeActions[1]).toHaveProperty(
          'type',
          'DELETE_EXPENSES_FAILURE',
        );
      });
  });
});
