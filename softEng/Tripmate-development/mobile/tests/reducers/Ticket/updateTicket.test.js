import reducer from '../../../src/reducers/Ticket/updateTicket';
import * as types from '../../../src/actions/Ticket/updateTicket';

describe('updateTicket reducer test', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      updateSuccessMessage: null,
      updateLoading: false,
      updateError: null,
    });
  });

  it('should handle UPDATE_TICKET_BEGIN', () => {
    expect(
      reducer([], {
        type: types.UPDATE_TICKET_BEGIN,
      }),
    ).toEqual({
      updateLoading: true,
      updateError: null,
    });
  });

  it('should handle UPDATE_TICKET_SUCCESS', () => {
    expect(
      reducer([], {
        type: types.UPDATE_TICKET_SUCCESS,
        payload: {
          successMessage: 'Ticket Updated!',
        },
      }),
    ).toEqual({
      updateLoading: false,
      updateSuccessMessage: 'Ticket Updated!',
    });
    expect(
      reducer(
        {updateSuccessMessage: null, updateLoading: true, updateError: null},
        {
          type: types.UPDATE_TICKET_SUCCESS,
          payload: {
            successMessage: 'Ticket Updated!',
          },
        },
      ),
    ).toEqual({
      updateLoading: false,
      updateError: null,
      updateSuccessMessage: 'Ticket Updated!',
    });
  });

  it('should handle UPDATE_TICKET_FAILURE', () => {
    expect(
      reducer([], {
        type: types.UPDATE_TICKET_FAILURE,
        payload: {error: 'Test Error'},
      }),
    ).toEqual({
      updateLoading: false,
      updateError: 'Test Error',
      updateSuccessMessage: null,
    });
    expect(
      reducer(
        {
          updateLoading: true,
          updateError: null,
        },
        {
          type: types.UPDATE_TICKET_FAILURE,
          payload: {error: 'Test Error'},
        },
      ),
    ).toEqual({
      updateSuccessMessage: null,
      updateLoading: false,
      updateError: 'Test Error',
    });
  });
});
