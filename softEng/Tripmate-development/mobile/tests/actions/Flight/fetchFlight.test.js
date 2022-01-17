import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import expect from 'expect';
import * as actions from '../../../src/actions/Flight/fetchFlight';
import {url} from '../../../src/utils/globalVars';

const middleware = [thunk];
const mockStore = configureMockStore(middleware);
const mockAxios = new MockAdapter(axios);
const store = mockStore({});

describe('fetch flight actions', () => {
  beforeEach(() => {
    store.clearActions();
  });

  it('creates GET_FLIGHT_SUCCESS when fetching flight has been done', () => {
    mockAxios
      .onGet(url + '/flight/trip/5e6aeefdb3256d55d6091d82')
      .reply(200, [{name: 'Test flight title'}]);

    return store
      .dispatch(actions.fetchFlight('5e6aeefdb3256d55d6091d82'))
      .then(() => {
        const expectedActions = [
          {type: actions.GET_FLIGHT_BEGIN},
          {
            type: actions.GET_FLIGHT_SUCCESS,
            payload: {flight: [{name: 'Test flight title'}]},
          },
        ];
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('creates GET_FLIGHT_FAILURE when fetching flight has failed', () => {
    mockAxios.onGet(url + '/flight/trip/5e6aeefdb3256d55d6091d82').reply(500);

    return store
      .dispatch(actions.fetchFlight('5e6aeefdb3256d55d6091d82'))
      .then(() => {
        const storeActions = store.getActions();
        expect(storeActions[0]).toHaveProperty('type', 'GET_FLIGHT_BEGIN');
        expect(storeActions[1]).toHaveProperty('type', 'GET_FLIGHT_FAILURE');
      });
  });
});
