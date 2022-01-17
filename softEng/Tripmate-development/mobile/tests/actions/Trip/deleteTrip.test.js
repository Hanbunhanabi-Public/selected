import configureMockStore from 'redux-mock-store';
import trunk from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import expect from 'expect';
import * as actions from '../../../src/actions/Trip/deleteTrip';
import {url} from '../../../src/utils/globalVars';

const middleware = [trunk];
const mockStore = configureMockStore(middleware);
const mockAxios = new MockAdapter(axios);
const store = mockStore({});

let trip = {
  _id: '5e4f6675eddfd25ef052f9c0',
  tripname: 'new',
  userId: '5e6aeefdb3256d55d6091d82',
  createdAt: '2020-02-21T05:11:17.039Z',
  updatedAt: '2020-02-21T05:11:17.039Z',
  __v: 0,
};

describe('delete trip actions', () => {
  beforeEach(() => {
    store.clearActions();
  });

  it('creates DELETE_TRIP_SUCCESS when delete trip has been done', () => {
    mockAxios
      .onDelete(url + '/trip/' + trip._id)
      .reply(200, [{data: 'Trip deleted.'}]);
    return store.dispatch(actions.deleteTrip(trip._id)).then(() => {
      const expectedActions = [
        {type: actions.DELETE_TRIP_BEGIN},
        {
          type: actions.DELETE_TRIP_SUCCESS,
          payload: {
            deleteSuccessMessage: [{data: 'Trip deleted.'}],
          },
        },
      ];
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('creates DELETE_TRIP_FAILURE when delete trip has failed', () => {
    mockAxios.onDelete(url + '/trip/' + trip._id).reply(500);

    return store.dispatch(actions.deleteTrip(trip._id)).then(() => {
      const storeActions = store.getActions();
      expect(storeActions[0]).toHaveProperty('type', 'DELETE_TRIP_BEGIN');
      expect(storeActions[1]).toHaveProperty('type', 'DELETE_TRIP_FAILURE');
    });
  });
});
