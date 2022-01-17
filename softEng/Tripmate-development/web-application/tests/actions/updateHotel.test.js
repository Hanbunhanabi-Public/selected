import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import expect from 'expect';
import * as actions from '../../src/actions/hotel/updateHotel';

const middleware = [thunk];
const mockStore = configureMockStore(middleware);
const mockAxios = new MockAdapter(axios);
const store = mockStore({});

describe('update hotel actions', () => {
  beforeEach(() => {
    store.clearActions();
  });

  it('creates UPDATE_HOTEL_FAILURE when updating hotel has failed', () => {
    const testHotelID = 12345;
    mockAxios.onPost(`/hotel/update/${testHotelID}`).reply(500);

    return store.dispatch(actions.updateHotel()).then(() => {
      const storeActions = store.getActions();
      expect(storeActions[0]).toHaveProperty('type', 'UPDATE_HOTEL_BEGIN');
      expect(storeActions[1]).toHaveProperty('type', 'UPDATE_HOTEL_FAILURE');
    });
  });
});
