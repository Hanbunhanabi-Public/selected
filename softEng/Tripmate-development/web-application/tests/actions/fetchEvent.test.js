import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import expect from 'expect';
import * as actions from '../../src/actions/event/fetchEvent';

const middleware = [thunk];
const mockStore = configureMockStore(middleware);
const mockAxios = new MockAdapter(axios);
const store = mockStore({});

describe('Fetch event actions', () => {
  beforeEach(() => {
    store.clearActions();
  });

  it('creates GET_EVENT_SUCCESS when fetching event has been done', () => {
    mockAxios
      .onGet('/event/trip/5e6aeefdb3256d55d6091d82')
      .reply(200, [{title: 'Test Event'}]);

    return store
      .dispatch(actions.fetchEvent('5e6aeefdb3256d55d6091d82'))
      .then(() => {
        const expectedActions = [
          {type: actions.GET_EVENT_BEGIN},
          {
            type: actions.GET_EVENT_SUCCESS,
            payload: {event: [{title: 'Test Event'}]},
          },
        ];
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('creates GET_EVENT_FAILURE when fetching event has failed', () => {
    mockAxios.onGet('/event/trip/5e6aeefdb3256d55d6091d82').reply(500);

    return store
      .dispatch(actions.fetchEvent('5e6aeefdb3256d55d6091d82'))
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', 'GET_EVENT_BEGIN');
        expect(actions[1]).toHaveProperty('type', 'GET_EVENT_FAILURE');
      });
  });
});
