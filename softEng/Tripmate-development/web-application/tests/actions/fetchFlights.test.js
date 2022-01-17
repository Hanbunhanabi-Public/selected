import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import expect from 'expect';
import * as actions from '../../src/actions/flight/fetchFlight';

const middleware = [thunk];
const mockStore = configureMockStore(middleware);
const mockAxios = new MockAdapter(axios);
const store = mockStore({});

describe('async actions', () => {
  beforeEach(() => {
    store.clearActions();
  });

  it('creates GET_FLIGHT_SUCCESS when fetching flight has been done', () => {
    mockAxios
      .onGet('/flight/trip/5e6aeefdb3256d55d6091d82')
      .reply(200, [{name: 'Test Flight'}]);

    return store
      .dispatch(actions.fetchFlight('5e6aeefdb3256d55d6091d82'))
      .then(() => {
        const expectedActions = [
          {type: actions.GET_FLIGHT_BEGIN},
          {
            type: actions.GET_FLIGHT_SUCCESS,
            payload: {flight: [{name: 'Test Flight'}]},
          },
        ];
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('creates GET_FLIGHT_FAILURE when fetching flight has failed', () => {
    mockAxios.onGet('/flight/trip/5e6aeefdb3256d55d6091d82').reply(500);

    return store
      .dispatch(actions.fetchFlight('5e6aeefdb3256d55d6091d82'))
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', 'GET_FLIGHT_BEGIN');
        expect(actions[1]).toHaveProperty('type', 'GET_FLIGHT_FAILURE');
      });
  });
});
