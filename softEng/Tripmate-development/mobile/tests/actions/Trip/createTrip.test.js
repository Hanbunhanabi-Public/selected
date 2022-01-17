import configureMockStore from 'redux-mock-store';
import trunk from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import expect from 'expect';
import * as actions from '../../../src/actions/Trip/createTrip';
import {url} from '../../../src/utils/globalVars';

const middleware = [trunk];
const mockStore = configureMockStore(middleware);
const mockAxios = new MockAdapter(axios);
const store = mockStore({});

describe('create trip actions', () => {
  beforeEach(() => {
    store.clearActions();
  });
  it('creates CREATE_TRIP_SUCCESS when fetching trip has been done', () => {
    mockAxios.onPost(url + '/trip/add/5e6aadb4160a6405089090ec').reply(200, [
      {
        data: 'Trip added.',
      },
    ]);
    return store
      .dispatch(actions.createTrip('5e6aadb4160a6405089090ec'))
      .then(() => {
        const expectedActions = [
          {type: actions.CREATE_TRIP_BEGIN},
          {
            type: actions.CREATE_TRIP_SUCCESS,
            payload: {
              successMessage: [
                {
                  data: 'Trip added.',
                },
              ],
            },
          },
        ];
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('creates CREATE_TRIP_FAILURE when fetching trip has failed', () => {
    mockAxios.onPost(url + '/trip/add/5e6aadb4160a6405089090ec').reply(500);

    return store.dispatch(actions.createTrip()).then(() => {
      const storeActions = store.getActions();
      expect(storeActions[0]).toHaveProperty('type', 'CREATE_TRIP_BEGIN');
      expect(storeActions[1]).toHaveProperty('type', 'CREATE_TRIP_FAILURE');
    });
  });
});
