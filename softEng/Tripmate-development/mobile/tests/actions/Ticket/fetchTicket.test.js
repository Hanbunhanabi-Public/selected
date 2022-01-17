import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import expect from 'expect';
import * as actions from '../../../src/actions/Ticket/fetchTicket';
import {url} from '../../../src/utils/globalVars';

const middleware = [thunk];
const mockStore = configureMockStore(middleware);
const mockAxios = new MockAdapter(axios);
const store = mockStore({});

describe('fetch ticket actions', () => {
  beforeEach(() => {
    store.clearActions();
  });

  it('creates GET_TICKET_SUCCESS when fetching ticket has been done', () => {
    mockAxios
      .onGet(url + '/ticket/trip/5e6aeefdb3256d55d6091d82')
      .reply(200, [{name: 'Test ticket title'}]);

    return store
      .dispatch(actions.fetchTicket('5e6aeefdb3256d55d6091d82'))
      .then(() => {
        const expectedActions = [
          {type: actions.GET_TICKET_BEGIN},
          {
            type: actions.GET_TICKET_SUCCESS,
            payload: {ticket: [{name: 'Test ticket title'}]},
          },
        ];
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('creates GET_TICKET_FAILURE when fetching ticket has failed', () => {
    mockAxios.onGet(url + '/ticket/trip/5e6aeefdb3256d55d6091d82').reply(500);

    return store
      .dispatch(actions.fetchTicket('5e6aeefdb3256d55d6091d82'))
      .then(() => {
        const storeActions = store.getActions();
        expect(storeActions[0]).toHaveProperty('type', 'GET_TICKET_BEGIN');
        expect(storeActions[1]).toHaveProperty('type', 'GET_TICKET_FAILURE');
      });
  });
});
