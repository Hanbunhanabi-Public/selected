import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import expect from 'expect';
import * as actions from '../../../src/actions/Flight/createFlight';
import {url} from '../../../src/utils/globalVars';

const middleware = [thunk];
const mockStore = configureMockStore(middleware);
const mockAxios = new MockAdapter(axios);
const store = mockStore({});

describe('add flight actions', () => {
  beforeEach(() => {
    store.clearActions();
  });

  it('creates CREATE_FLIGHT_SUCCESS when fetching flight has been done using the external API call', () => {
    mockAxios
      .onPost(url + '/flight/add_api/5e6aeefdb3256d55d6091d82')
      .reply(200, [
        {
          data: 'Flight added.',
        },
      ]);
    return store
      .dispatch(actions.createFlightAutomatically('5e6aeefdb3256d55d6091d82'))
      .then(() => {
        const expectedActions = [
          {type: actions.CREATE_FLIGHT_BEGIN},
          {
            type: actions.CREATE_FLIGHT_SUCCESS,
            payload: {
              successMessage: [
                {
                  data: 'Flight added.',
                },
              ],
            },
          },
        ];
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('creates CREATE_FLIGHT_SUCCESS when fetching flight has been done using manual add', () => {
    mockAxios
      .onPost(url + '/flight/add_manual/5e6aeefdb3256d55d6091d82')
      .reply(200, [
        {
          data: 'Flight added.',
        },
      ]);

    return store
      .dispatch(actions.createFlightManually('5e6aeefdb3256d55d6091d82'))
      .then(() => {
        const expectedActions = [
          {type: actions.CREATE_FLIGHT_BEGIN},
          {
            type: actions.CREATE_FLIGHT_SUCCESS,
            payload: {
              successMessage: [
                {
                  data: 'Flight added.',
                },
              ],
            },
          },
        ];
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('creates CREATE_FLIGHT_FAILURE when fetching flight has failed using the external API call', () => {
    mockAxios
      .onPost(url + '/flight/add_api/5e6aeefdb3256d55d6091d82')
      .reply(500);

    return store
      .dispatch(actions.createFlightAutomatically('5e6aeefdb3256d55d6091d82'))
      .then(() => {
        const storeActions = store.getActions();
        expect(storeActions[0]).toHaveProperty('type', 'CREATE_FLIGHT_BEGIN');
        expect(storeActions[1]).toHaveProperty('type', 'CREATE_FLIGHT_FAILURE');
      });
  });

  it('creates CREATE_FLIGHT_FAILURE when fetching flight has failed using manual add', () => {
    mockAxios
      .onPost(url + '/flight/add_manual/5e6aeefdb3256d55d6091d82')
      .reply(500);

    return store
      .dispatch(actions.createFlightManually('5e6aeefdb3256d55d6091d82'))
      .then(() => {
        const storeActions = store.getActions();
        expect(storeActions[0]).toHaveProperty('type', 'CREATE_FLIGHT_BEGIN');
        expect(storeActions[1]).toHaveProperty('type', 'CREATE_FLIGHT_FAILURE');
      });
  });
});
