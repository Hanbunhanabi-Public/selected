import reducer from '../../src/reducers/user/getUser';
import * as types from '../../src/actions';

describe('getUser reducer test', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      user: [],
      loading: true,
      error: null,
    });
  });

  it('should handle GET_USER_BEGIN', () => {
    expect(
      reducer([], {
        type: types.GET_USER_BEGIN,
      }),
    ).toEqual({
      loading: true,
      error: null,
    });
  });

  it('should handle GET_USER_SUCCESS', () => {
    expect(
      reducer([], {
        type: types.GET_USER_SUCCESS,
        payload: {user: [{username: 'Test User'}]},
      }),
    ).toEqual({
      user: [{username: 'Test User'}],
      loading: false,
    });
    expect(
      reducer(
        {
          user: [],
          loading: true,
          error: null,
        },
        {
          type: types.GET_USER_SUCCESS,
          payload: {user: [{username: 'Test User'}]},
        },
      ),
    ).toEqual({
      user: [{username: 'Test User'}],
      loading: false,
      error: null,
    });
  });

  it('should handle GET_USER_FAILURE', () => {
    expect(
      reducer([], {
        type: types.GET_USER_FAILURE,
        payload: {error: 'Test Error'},
      }),
    ).toEqual({
      user: [],
      loading: false,
      error: 'Test Error',
    });
    expect(
      reducer(
        {
          user: [],
          loading: true,
          error: null,
        },
        {
          type: types.GET_USER_FAILURE,
          payload: {error: 'Test Error'},
        },
      ),
    ).toEqual({
      user: [],
      loading: false,
      error: 'Test Error',
    });
  });
});
