import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import expect from 'expect';
import * as actions from '../../../src/actions/Hotel/fetchHotel';
import {url} from '../../../src/utils/globalVars';

const middleware = [thunk];
const mockStore = configureMockStore(middleware);
const mockAxios = new MockAdapter(axios);
const store = mockStore({});

describe('fetch hotel actions', () => {
  beforeEach(() => {
    store.clearActions();
  });

  it('creates GET_HOTEL_SUCCESS when fetching hotel has been done', () => {
    mockAxios
      .onGet(url + '/hotel/trip/5e6aeefdb3256d55d6091d82')
      .reply(200, [{name: 'Test Hotel'}]);

    return store
      .dispatch(actions.fetchHotel('5e6aeefdb3256d55d6091d82'))
      .then(() => {
        const expectedActions = [
          {type: actions.GET_HOTEL_BEGIN},
          {
            type: actions.GET_HOTEL_SUCCESS,
            payload: {hotel: [{name: 'Test Hotel'}]},
          },
        ];
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('creates GET_HOTEL_FAILURE when fetching hotel has failed', () => {
    mockAxios.onGet(url + '/hotel/trip/5e6aeefdb3256d55d6091d82').reply(500);

    return store
      .dispatch(actions.fetchHotel('5e6aeefdb3256d55d6091d82'))
      .then(() => {
        const action = store.getActions();
        expect(action[0]).toHaveProperty('type', 'GET_HOTEL_BEGIN');
        expect(action[1]).toHaveProperty('type', 'GET_HOTEL_FAILURE');
      });
  });
});
