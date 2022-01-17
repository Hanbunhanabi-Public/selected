import reducer from '../../src/reducers/event/getEvent';
import * as types from '../../src/actions/event/fetchEvent';

describe('getEvent reducer test', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      event: [],
      loading: true,
      error: null,
    });
  });

  it('should handle GET_EVENT_BEGIN', () => {
    expect(
      reducer([], {
        type: types.GET_EVENT_BEGIN,
      }),
    ).toEqual({
      loading: true,
      error: null,
    });
  });

  it('should handle GET_EVENT_SUCCESS', () => {
    expect(
      reducer([], {
        type: types.GET_EVENT_SUCCESS,
        payload: {event: [{title: 'Test Event'}]},
      }),
    ).toEqual({
      event: [{title: 'Test Event'}],
      loading: false,
    });
    expect(
      reducer(
        {
          event: [],
          loading: true,
          error: null,
        },
        {
          type: types.GET_EVENT_SUCCESS,
          payload: {event: [{title: 'Test Event'}]},
        },
      ),
    ).toEqual({
      event: [{title: 'Test Event'}],
      loading: false,
      error: null,
    });
  });

  it('should handle GET_EVENT_FAILURE', () => {
    expect(
      reducer([], {
        type: types.GET_EVENT_FAILURE,
        payload: {error: 'Test Error'},
      }),
    ).toEqual({
      event: [],
      loading: false,
      error: 'Test Error',
    });
    expect(
      reducer(
        {
          event: [],
          loading: true,
          error: null,
        },
        {
          type: types.GET_EVENT_FAILURE,
          payload: {error: 'Test Error'},
        },
      ),
    ).toEqual({
      event: [],
      loading: false,
      error: 'Test Error',
    });
  });
});
