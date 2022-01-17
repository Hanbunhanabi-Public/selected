import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import expect from 'expect';
import * as actions from '../../../src/actions/Ticket/createTicket';
import {url} from '../../../src/utils/globalVars';

const middleware = [thunk];
const mockStore = configureMockStore(middleware);
const mockAxios = new MockAdapter(axios);
const store = mockStore({});

describe('add ticket actions', () => {
  beforeEach(() => {
    store.clearActions();
  });

  it('creates CREATE_TICKET_SUCCESS when fetching ticket has been done', () => {
    mockAxios.onPost(url + '/ticket/add/5e6aeefdb3256d55d6091d82').reply(200, [
      {
        data: 'Ticket added.',
      },
    ]);
    return store
      .dispatch(actions.createTicket('5e6aeefdb3256d55d6091d82'))
      .then(() => {
        const expectedActions = [
          {type: actions.CREATE_TICKET_BEGIN},
          {
            type: actions.CREATE_TICKET_SUCCESS,
            payload: {
              successMessage: [
                {
                  data: 'Ticket added.',
                },
              ],
            },
          },
        ];
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('creates CREATE_TICKET_FAILURE when fetching ticket has failed', () => {
    mockAxios.onPost(url + '/ticket/add/5e6aeefdb3256d55d6091d82').reply(500);

    return store
      .dispatch(actions.createTicket('5e6aeefdb3256d55d6091d82'))
      .then(() => {
        const storeActions = store.getActions();
        expect(storeActions[0]).toHaveProperty('type', 'CREATE_TICKET_BEGIN');
        expect(storeActions[1]).toHaveProperty('type', 'CREATE_TICKET_FAILURE');
      });
  });
});
