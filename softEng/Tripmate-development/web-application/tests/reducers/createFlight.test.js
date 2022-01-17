import reducer from '../../src/reducers/flight/createFlight';
import * as types from '../../src/actions/flight/createFlight';

// TODO: finish these tests
describe('createFlight reducer test', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      createSuccessMessage: null,
      createLoading: false,
      createError: null,
    });
  });

  it('should handle CREATE_FLIGHT_BEGIN', () => {
    expect(
      reducer([], {
        type: types.CREATE_FLIGHT_BEGIN,
      }),
    ).toEqual({
      createLoading: true,
      createError: null,
    });
  });

  it('should handle CREATE_FLIGHT_SUCCESS', () => {
    expect(
      reducer([], {
        type: types.CREATE_FLIGHT_SUCCESS,
        payload: {
          successMessage: {
            data: 'Flight added.',
          },
        },
      }),
    ).toEqual({
      createLoading: false,
      createSuccessMessage: {data: 'Flight added.'},
    });
    expect(
      reducer(
        {createSuccessMessage: null, createLoading: true, createError: null},
        {
          type: types.CREATE_FLIGHT_SUCCESS,
          payload: {
            successMessage: {
              data: 'Flight added.',
            },
          },
        },
      ),
    ).toEqual({
      createLoading: false,
      createError: null,
      createSuccessMessage: {data: 'Flight added.'},
    });
  });

  it('should handle CREATE_FLIGHT_FAILURE', () => {
    expect(
      reducer([], {
        type: types.CREATE_FLIGHT_FAILURE,
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
          type: types.CREATE_FLIGHT_FAILURE,
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
