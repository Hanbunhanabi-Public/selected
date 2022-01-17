import reducer from '../../../src/reducers/Ticket/getTicket';
import * as types from '../../../src/actions/Ticket/fetchTicket';

describe('getTicket reducer test', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      ticket: [],
      loading: false,
      error: null,
    });
  });

  it('should handle GET_TICKET_BEGIN', () => {
    expect(
      reducer([], {
        type: types.GET_TICKET_BEGIN,
      }),
    ).toEqual({
      loading: true,
      error: null,
    });
  });

  it('should handle GET_TICKET_SUCCESS', () => {
    expect(
      reducer([], {
        type: types.GET_TICKET_SUCCESS,
        payload: {ticket: [{name: 'Test Ticket'}]},
      }),
    ).toEqual({
      ticket: [{name: 'Test Ticket'}],
      loading: false,
    });
    expect(
      reducer(
        {
          ticket: [],
          loading: true,
          error: null,
        },
        {
          type: types.GET_TICKET_SUCCESS,
          payload: {ticket: [{name: 'Test Ticket'}]},
        },
      ),
    ).toEqual({
      ticket: [{name: 'Test Ticket'}],
      loading: false,
      error: null,
    });
  });

  it('should handle GET_TICKET_FAILURE', () => {
    expect(
      reducer([], {
        type: types.GET_TICKET_FAILURE,
        payload: {error: 'Test Error'},
      }),
    ).toEqual({
      ticket: [],
      loading: false,
      error: 'Test Error',
    });
    expect(
      reducer(
        {
          ticket: [],
          loading: true,
          error: null,
        },
        {
          type: types.GET_TICKET_FAILURE,
          payload: {error: 'Test Error'},
        },
      ),
    ).toEqual({
      ticket: [],
      loading: false,
      error: 'Test Error',
    });
  });
});
