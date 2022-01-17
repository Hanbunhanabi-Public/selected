import reducer from '../../../src/reducers/Event/createEvent';
import * as types from '../../../src/actions/Event/createEvent';

describe('createEvent reducer test', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      createSuccessMessage: null,
      createLoading: false,
      createError: null,
    });
  });

  it('should handle CREATE_EVENT_BEGIN', () => {
    expect(
      reducer([], {
        type: types.CREATE_EVENT_BEGIN,
      }),
    ).toEqual({
      createLoading: true,
      createError: null,
    });
  });

  it('should handle CREATE_EVENT_SUCCESS', () => {
    expect(
      reducer([], {
        type: types.CREATE_EVENT_SUCCESS,
        payload: {
          successMessage: {
            data: 'Event added.',
          },
        },
      }),
    ).toEqual({
      createLoading: false,
      createSuccessMessage: {data: 'Event added.'},
    });
    expect(
      reducer(
        {createSuccessMessage: null, createLoading: true, createError: null},
        {
          type: types.CREATE_EVENT_SUCCESS,
          payload: {
            successMessage: {
              data: 'Event added.',
            },
          },
        },
      ),
    ).toEqual({
      createLoading: false,
      createError: null,
      createSuccessMessage: {data: 'Event added.'},
    });
  });

  it('should handle CREATE_EVENT_FAILURE', () => {
    expect(
      reducer([], {
        type: types.CREATE_EVENT_FAILURE,
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
          type: types.CREATE_EVENT_FAILURE,
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
