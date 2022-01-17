import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import expect from 'expect';
import * as actions from '../../src/actions/ticket/deleteTicket';

const middleware = [thunk];
const mockStore = configureMockStore(middleware);
const mockAxios = new MockAdapter(axios);
const store = mockStore({});

describe('delete ticket actions', () => {
  beforeEach(() => {
    store.clearActions();
  });

  const ticket = {
    start: {
      location: 'Paris',
      date: '2020-01-01',
    },
    end: {
      location: 'Madrid',
      date: '2020-01-03',
    },
    _id: '5e610f4e65b8ec08a93bfff4',
    transportType: 'Rail',
    createdAt: '2020-03-05T14:40:14.753Z',
    updatedAt: '2020-03-05T15:22:57.017Z',
    __v: 0,
  };

  it('creates DELETE_TICKET_SUCCESS when delete ticket has been done', () => {
    mockAxios
      .onDelete(`ticket/${ticket._id}`)
      .reply(200, [{data: 'Ticket deleted.'}]);
    return store.dispatch(actions.deleteTicket(ticket._id)).then(() => {
      const expectedActions = [
        {type: actions.DELETE_TICKET_BEGIN},
        {
          type: actions.DELETE_TICKET_SUCCESS,
          payload: {
            successMessage: [{data: 'Ticket deleted.'}],
          },
        },
      ];
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('creates DELETE_TICKET_FAILURE when deleting ticket has failed', () => {
    mockAxios.onDelete('/ticket').reply(500);

    return store.dispatch(actions.deleteTicket()).then(() => {
      const storeActions = store.getActions();
      expect(storeActions[0]).toHaveProperty('type', 'DELETE_TICKET_BEGIN');
      expect(storeActions[1]).toHaveProperty('type', 'DELETE_TICKET_FAILURE');
    });
  });
});
