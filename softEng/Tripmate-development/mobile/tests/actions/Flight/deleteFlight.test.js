import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import expect from 'expect';
import * as actions from '../../../src/actions/Flight/deleteFlight';
import {url} from '../../../src/utils/globalVars';

const middleware = [thunk];
const mockStore = configureMockStore(middleware);
const mockAxios = new MockAdapter(axios);
const store = mockStore({});

describe('delete flight actions', () => {
  beforeEach(() => {
    store.clearActions();
  });

  let flight = {
    _id: '5e4f6675eddfd25ef052f9c0',
    number: 'ABC123',
    date: '2020-01-01',
    createdAt: '2020-02-21T05:11:17.039Z',
    updatedAt: '2020-02-21T05:11:17.039Z',
    __v: 0,
  };

  it('creates DELETE_FLIGHT_SUCCESS when delete flight has been done', () => {
    mockAxios
      .onDelete(`${url}/flight/${flight._id}`)
      .reply(200, [{data: 'Flight deleted.'}]);
    return store.dispatch(actions.deleteFlight(flight._id)).then(() => {
      const expectedActions = [
        {type: actions.DELETE_FLIGHT_BEGIN},
        {
          type: actions.DELETE_FLIGHT_SUCCESS,
          payload: {
            successMessage: [{data: 'Flight deleted.'}],
          },
        },
      ];
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('creates DELETE_FLIGHT_FAILURE when deleting flight has failed', () => {
    mockAxios.onDelete(`${url}/flight/`).reply(500);

    return store.dispatch(actions.deleteFlight()).then(() => {
      const storeActions = store.getActions();
      expect(storeActions[0]).toHaveProperty('type', 'DELETE_FLIGHT_BEGIN');
      expect(storeActions[1]).toHaveProperty('type', 'DELETE_FLIGHT_FAILURE');
    });
  });
});
