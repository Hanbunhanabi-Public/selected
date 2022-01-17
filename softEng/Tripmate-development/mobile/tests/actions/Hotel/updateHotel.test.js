import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import expect from 'expect';
import * as actions from '../../../src/actions/Hotel/updateHotel';
import {url} from '../../../src/utils/globalVars';

const middleware = [thunk];
const mockStore = configureMockStore(middleware);
const mockAxios = new MockAdapter(axios);
const store = mockStore({});

describe('update hotel actions', () => {
  beforeEach(() => {
    store.clearActions();
  });

  let hotel = {
    _id: '5e4f6675eddfd25ef052f9c0',
    name: 'Test hotel',
    location: 'Somewhere',
    checkIn: '2020-04-20',
    checkOut: '2020-04-23',
    price: '$123',
    rating: '4.0',
    numRating: '123',
    priceLevel: '$$$',
  };

  it('creates UPDATE_HOTEL_SUCCESS when delete hotel has been done', () => {
    mockAxios
      .onPost(`${url}/hotel/update/${hotel._id}`)
      .reply(200, [{data: 'Hotel updated.'}]);
    return store
      .dispatch(actions.updateHotel(hotel._id, 'Test update'))
      .then(() => {
        const expectedActions = [
          {type: actions.UPDATE_HOTEL_BEGIN},
          {
            type: actions.UPDATE_HOTEL_SUCCESS,
            payload: {
              successMessage: [{data: 'Hotel updated.'}],
            },
          },
        ];
        expect(store.getActions()).toEqual(expectedActions);
      });
  });
  it('creates UPDATE_HOTEL_FAILURE when updating hotel has failed', () => {
    mockAxios.onPost(url + `/hotel/update/${hotel._id}`).reply(500);
    return store.dispatch(actions.updateHotel()).then(() => {
      const storeActions = store.getActions();
      expect(storeActions[0]).toHaveProperty('type', 'UPDATE_HOTEL_BEGIN');
      expect(storeActions[1]).toHaveProperty('type', 'UPDATE_HOTEL_FAILURE');
    });
  });
});
