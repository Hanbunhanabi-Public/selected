import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import expect from 'expect';
import * as actions from '../../../src/actions/Hotel/deleteHotel';
import {url} from '../../../src/utils/globalVars';

const middleware = [thunk];
const mockStore = configureMockStore(middleware);
const mockAxios = new MockAdapter(axios);
const store = mockStore({});

describe('delete hotel actions', () => {
  beforeEach(() => {
    store.clearActions();
  });

  it('creates DELETE_HOTEL_FAILURE when deleting hotel has failed', () => {
    mockAxios.onDelete(url + '/hotel').reply(500);

    return store.dispatch(actions.deleteHotel()).then(() => {
      const storeActions = store.getActions();
      expect(storeActions[0]).toHaveProperty('type', 'DELETE_HOTEL_BEGIN');
      expect(storeActions[1]).toHaveProperty('type', 'DELETE_HOTEL_FAILURE');
    });
  });
});
