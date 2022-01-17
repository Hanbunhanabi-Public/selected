import reducer from '../../../src/reducers/Hotel/createHotel';
import * as types from '../../../src/actions/Hotel/createHotel';

describe('createHotel reducer test', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      createSuccessMessage: null,
      createLoading: false,
      createError: null,
    });
  });

  it('should handle CREATE_HOTEL_BEGIN', () => {
    expect(
      reducer([], {
        type: types.CREATE_HOTEL_BEGIN,
      }),
    ).toEqual({
      createLoading: true,
      createError: null,
    });
  });

  it('should handle CREATE_HOTEL_SUCCESS', () => {
    expect(
      reducer([], {
        type: types.CREATE_HOTEL_SUCCESS,
        payload: {
          successMessage: {
            data: 'Hotel added.',
          },
        },
      }),
    ).toEqual({
      createLoading: false,
      createSuccessMessage: {data: 'Hotel added.'},
    });
    expect(
      reducer(
        {createSuccessMessage: null, createLoading: true, createError: null},
        {
          type: types.CREATE_HOTEL_SUCCESS,
          payload: {
            successMessage: {
              data: 'Hotel added.',
            },
          },
        },
      ),
    ).toEqual({
      createLoading: false,
      createError: null,
      createSuccessMessage: {data: 'Hotel added.'},
    });
  });

  it('should handle CREATE_HOTEL_FAILURE', () => {
    expect(
      reducer([], {
        type: types.CREATE_HOTEL_FAILURE,
        payload: {error: 'Hotel Error'},
      }),
    ).toEqual({
      createLoading: false,
      createError: 'Hotel Error',
      createSuccessMessage: null,
    });
    expect(
      reducer(
        {
          createLoading: true,
          createError: null,
        },
        {
          type: types.CREATE_HOTEL_FAILURE,
          payload: {error: 'Hotel Error'},
        },
      ),
    ).toEqual({
      createSuccessMessage: null,
      createLoading: false,
      createError: 'Hotel Error',
    });
  });
});
