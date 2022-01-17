import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import expect from 'expect';
import * as actions from '../../../src/actions/Flight/updateFlight';
import {url} from '../../../src/utils/globalVars';

const middleware = [thunk];
const mockStore = configureMockStore(middleware);
const mockAxios = new MockAdapter(axios);
const store = mockStore({});

describe('update flight actions', () => {
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

  it('creates UPDATE_FLIGHT_SUCCESS when delete flight has been done', () => {
    mockAxios
      .onPost(`${url}/flight/update/${flight._id}`)
      .reply(200, [{data: 'Flight updated.'}]);
    return store
      .dispatch(actions.updateFlight(flight._id, 'Test update'))
      .then(() => {
        const expectedActions = [
          {type: actions.UPDATE_FLIGHT_BEGIN},
          {
            type: actions.UPDATE_FLIGHT_SUCCESS,
            payload: {
              successMessage: [{data: 'Flight updated.'}],
            },
          },
        ];
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('creates UPDATE_FLIGHT_FAILURE when updating flight has failed', () => {
    mockAxios.onPost(`${url}/flight/update/${flight._id}`).reply(500);

    return store.dispatch(actions.updateFlight()).then(() => {
      const storeActions = store.getActions();
      expect(storeActions[0]).toHaveProperty('type', 'UPDATE_FLIGHT_BEGIN');
      expect(storeActions[1]).toHaveProperty('type', 'UPDATE_FLIGHT_FAILURE');
    });
  });
});
