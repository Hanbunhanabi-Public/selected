import reducer from '../../../src/reducers/Ticket/createTicket';
import * as types from '../../../src/actions/Ticket/createTicket';

// TODO: finish these tests
describe('createTicket reducer test', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      createSuccessMessage: null,
      createLoading: false,
      createError: null,
    });
  });

  it('should handle CREATE_TICKET_BEGIN', () => {
    expect(
      reducer([], {
        type: types.CREATE_TICKET_BEGIN,
      }),
    ).toEqual({
      createLoading: true,
      createError: null,
    });
  });

  it('should handle CREATE_TICKET_SUCCESS', () => {
    expect(
      reducer([], {
        type: types.CREATE_TICKET_SUCCESS,
        payload: {
          successMessage: {
            data: 'Ticket added.',
          },
        },
      }),
    ).toEqual({
      createLoading: false,
      createSuccessMessage: {data: 'Ticket added.'},
    });
    expect(
      reducer(
        {createSuccessMessage: null, createLoading: true, createError: null},
        {
          type: types.CREATE_TICKET_SUCCESS,
          payload: {
            successMessage: {
              data: 'Ticket added.',
            },
          },
        },
      ),
    ).toEqual({
      createLoading: false,
      createError: null,
      createSuccessMessage: {data: 'Ticket added.'},
    });
  });

  it('should handle CREATE_TICKET_FAILURE', () => {
    expect(
      reducer([], {
        type: types.CREATE_TICKET_FAILURE,
        payload: {error: 'Test Error'},
      }),
    ).toEqual({
      createLoading: false,
      createError: 'Test Error',
      createSuccessMessage: null,
    });
    expect(
      reducer(
        {
          createLoading: true,
          createError: null,
        },
        {
          type: types.CREATE_TICKET_FAILURE,
          payload: {error: 'Test Error'},
        },
      ),
    ).toEqual({
      createSuccessMessage: null,
      createLoading: false,
      createError: 'Test Error',
    });
  });
});
