import reducer from '../../src/reducers/ticket/deleteTicket';
import * as types from '../../src/actions/ticket/deleteTicket';

describe('deleteTicket reducer test', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      deleteSuccessMessage: null,
      deleteLoading: true,
      deleteError: null,
    });
  });

  it('should handle DELETE_TICKET_BEGIN', () => {
    expect(
      reducer([], {
        type: types.DELETE_TICKET_BEGIN,
      }),
    ).toEqual({
      deleteLoading: true,
      deleteError: null,
    });
  });

  it('should handle DELETE_TICKET_SUCCESS', () => {
    expect(
      reducer([], {
        type: types.DELETE_TICKET_SUCCESS,
        payload: {
          successMessage: 'Ticket Deleted.',
        },
      }),
    ).toEqual({
      deleteLoading: false,
      deleteSuccessMessage: 'Ticket Deleted.',
    });
    expect(
      reducer(
        {deleteSuccessMessage: null, deleteLoading: true, deleteError: null},
        {
          type: types.DELETE_TICKET_SUCCESS,
          payload: {
            successMessage: 'Ticket Deleted.',
          },
        },
      ),
    ).toEqual({
      deleteLoading: false,
      deleteError: null,
      deleteSuccessMessage: 'Ticket Deleted.',
    });
  });

  it('should handle DELETE_TICKET_FAILURE', () => {
    expect(
      reducer([], {
        type: types.DELETE_TICKET_FAILURE,
        payload: {error: 'Test Error'},
      }),
    ).toEqual({
      deleteLoading: false,
      deleteError: 'Test Error',
      deleteSuccessMessage: null,
    });
    expect(
      reducer(
        {
          deleteLoading: true,
          deleteError: null,
        },
        {
          type: types.DELETE_TICKET_FAILURE,
          payload: {error: 'Test Error'},
        },
      ),
    ).toEqual({
      deleteSuccessMessage: null,
      deleteLoading: false,
      deleteError: 'Test Error',
    });
  });
});
