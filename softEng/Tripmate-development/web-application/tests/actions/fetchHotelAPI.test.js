import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import expect from 'expect';
import * as actions from '../../src/actions/hotel/fetchHotelAPI';

const middleware = [thunk];
const mockStore = configureMockStore(middleware);
const mockAxios = new MockAdapter(axios);
const store = mockStore({});

describe('fetch hotel API actions', () => {
  beforeEach(() => {
    store.clearActions();
  });

  it('creates API_HOTEL_SUCCESS when fetching hotels has been done', () => {
    mockAxios.onPost('/hotel/api').reply(200, [{name: 'Test Hotel'}]);

    return store.dispatch(actions.fetchHotelAPI()).then(() => {
      const expectedActions = [
        {type: actions.API_HOTEL_BEGIN},
        {
          type: actions.API_HOTEL_SUCCESS,
          payload: {hotel: [{name: 'Test Hotel'}]},
        },
      ];
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('creates API_HOTEL_FAILURE when fetching hotel has failed', () => {
    mockAxios.onPost('/hotel/api').reply(500);

    return store.dispatch(actions.fetchHotelAPI()).then(() => {
      const actions = store.getActions();
      expect(actions[0]).toHaveProperty('type', 'API_HOTEL_BEGIN');
      expect(actions[1]).toHaveProperty('type', 'API_HOTEL_FAILURE');
    });
  });
});
