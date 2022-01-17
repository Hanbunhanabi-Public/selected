import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import expect from 'expect';
import * as actions from '../../src/actions/event/createEvent';

const middleware = [thunk];
const mockStore = configureMockStore(middleware);
const mockAxios = new MockAdapter(axios);
const store = mockStore({});

describe('add event actions', () => {
  beforeEach(() => {
    store.clearActions();
  });

  it('creates CREATE_EVENT_SUCCESS when fetching event has been done', () => {
    mockAxios.onPost('/event/add/5e6aeefdb3256d55d6091d82').reply(200, [
      {
        data: 'Event added.',
      },
    ]);
    return store
      .dispatch(actions.createEvent('5e6aeefdb3256d55d6091d82'))
      .then(() => {
        const expectedActions = [
          {type: actions.CREATE_EVENT_BEGIN},
          {
            type: actions.CREATE_EVENT_SUCCESS,
            payload: {
              successMessage: [
                {
                  data: 'Event added.',
                },
              ],
            },
          },
        ];
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('creates CREATE_EVENT_FAILURE when fetching event has failed', () => {
    mockAxios.onPost('/event/add/5e6aeefdb3256d55d6091d82').reply(500);

    return store
      .dispatch(actions.createEvent('5e6aeefdb3256d55d6091d82'))
      .then(() => {
        const storeActions = store.getActions();
        expect(storeActions[0]).toHaveProperty('type', 'CREATE_EVENT_BEGIN');
        expect(storeActions[1]).toHaveProperty('type', 'CREATE_EVENT_FAILURE');
      });
  });
});
