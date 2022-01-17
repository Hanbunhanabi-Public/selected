import configureMockStore from 'redux-mock-store';
import trunk from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import expect from 'expect';
import * as actions from '../../../src/actions/Trip/updateTrip';
import {url} from '../../../src/utils/globalVars';

const middleware = [trunk];
const mockStore = configureMockStore(middleware);
const mockAxios = new MockAdapter(axios);
const store = mockStore({});

describe('update trip actions', () => {
  beforeEach(() => {
    store.clearActions();
  });
  it('creates UPDATE_TRIP_SUCCESS when update trip has been done', () => {
    mockAxios.onPost(url + '/trip/update/5e4f6675eddfd25ef052f9c0').reply(200, [
      {
        data: 'Trip updated.',
      },
    ]);
    return store
      .dispatch(
        actions.updateTrip('5e4f6675eddfd25ef052f9c0', {username: 'newer'}),
      )
      .then(() => {
        const expectedActions = [
          {type: actions.UPDATE_TRIP_BEGIN},
          {
            type: actions.UPDATE_TRIP_SUCCESS,
            payload: {
              successMessage: [
                {
                  data: 'Trip updated.',
                },
              ],
            },
          },
        ];
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('creates UPDATE_TRIP_FAILURE when update trip has failed', () => {
    mockAxios.onPost(url + '/trip/update/').reply(500);

    return store.dispatch(actions.updateTrip()).then(() => {
      const storeActions = store.getActions();
      expect(storeActions[0]).toHaveProperty('type', 'UPDATE_TRIP_BEGIN');
      expect(storeActions[1]).toHaveProperty('type', 'UPDATE_TRIP_FAILURE');
    });
  });
});
