import reducer from '../../src/reducers/trip/getTrips';
import * as types from '../../src/actions/trip/fetchTrips';

describe('getTrips reducer test', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      trips: {},
      loading: true,
      error: null,
    });
  });

  it('should handle GET_TRIPS_BEGIN', () => {
    expect(
      reducer(
        {},
        {
          type: types.GET_TRIPS_BEGIN,
        },
      ),
    ).toEqual({
      loading: true,
      error: null,
    });
  });

  it('should handle GET_TRIPS_SUCCESS', () => {
    expect(
      reducer([], {
        type: types.GET_TRIPS_SUCCESS,
        payload: {
          trips: [
            {
              _id: '5e4f6675eddfd25ef052f9c0',
              tripname: 'new',
              userId: '5e6aeefdb3256d55d6091d82',
            },
          ],
        },
      }),
    ).toEqual({
      trips: [
        {
          _id: '5e4f6675eddfd25ef052f9c0',
          tripname: 'new',
          userId: '5e6aeefdb3256d55d6091d82',
        },
      ],
      loading: false,
    });
    expect(
      reducer(
        {trips: {}, loading: true, error: null},
        {
          type: types.GET_TRIPS_SUCCESS,
          payload: {
            trips: [
              {
                _id: '5e4f6675eddfd25ef052f9c0',
                tripname: 'new',
                userId: '5e6aeefdb3256d55d6091d82',
              },
            ],
          },
        },
      ),
    ).toEqual({
      trips: [
        {
          _id: '5e4f6675eddfd25ef052f9c0',
          tripname: 'new',
          userId: '5e6aeefdb3256d55d6091d82',
        },
      ],
      loading: false,
      error: null,
    });
  });

  it('should handle GET_TRIPS_FAILURE', () => {
    expect(
      reducer(
        {},
        {
          type: types.GET_TRIPS_FAILURE,
          payload: {error: 'Test Error'},
        },
      ),
    ).toEqual({
      trips: {},
      loading: false,
      error: 'Test Error',
    });
    expect(
      reducer(
        {
          trips: {},
          loading: true,
          error: null,
        },
        {
          type: types.GET_TRIPS_FAILURE,
          payload: {error: 'Test Error'},
        },
      ),
    ).toEqual({
      trips: {},
      loading: false,
      error: 'Test Error',
    });
  });
});
