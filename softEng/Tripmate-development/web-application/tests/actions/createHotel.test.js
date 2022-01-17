import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import expect from 'expect';
import * as actions from '../../src/actions/hotel/createHotel';

const middleware = [thunk];
const mockStore = configureMockStore(middleware);
const mockAxios = new MockAdapter(axios);
const store = mockStore({});

describe('add hotel actions', () => {
  beforeEach(() => {
    store.clearActions();
  });

  it('creates CREATE_HOTEL_SUCCESS when fetching hotel has been done', () => {
    mockAxios.onPost('/hotel/add/5e6aeefdb3256d55d6091d82').reply(200, [
      {
        data: 'Hotel added.',
      },
    ]);
    return store
      .dispatch(actions.createHotel('5e6aeefdb3256d55d6091d82'))
      .then(() => {
        const expectedActions = [
          {type: actions.CREATE_HOTEL_BEGIN},
          {
            type: actions.CREATE_HOTEL_SUCCESS,
            payload: {
              successMessage: [
                {
                  data: 'Hotel added.',
                },
              ],
            },
          },
        ];
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('creates CREATE_HOTEL_FAILURE when fetching hotel has failed', () => {
    mockAxios.onPost('/hotel/add/5e6aeefdb3256d55d6091d82').reply(500);

    return store
      .dispatch(actions.createHotel('5e6aeefdb3256d55d6091d82'))
      .then(() => {
        const storeActions = store.getActions();
        expect(storeActions[0]).toHaveProperty('type', 'CREATE_HOTEL_BEGIN');
        expect(storeActions[1]).toHaveProperty('type', 'CREATE_HOTEL_FAILURE');
      });
  });
});
