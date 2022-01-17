import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import expect from 'expect';
import * as actions from '../../src/actions/todo/fetchToDoList';

const middleware = [thunk];
const mockStore = configureMockStore(middleware);
const mockAxios = new MockAdapter(axios);
const store = mockStore({});

describe('async actions', () => {
  beforeEach(() => {
    store.clearActions();
  });

  it('creates GET_TODO_LIST_SUCCESS when fetching todolist has been done', () => {
    mockAxios
      .onGet('/todolist/trip/5e6aeefdb3256d55d6091d82')
      .reply(200, [{name: 'Test ToDo List'}]);

    return store
      .dispatch(actions.fetchToDoList('5e6aeefdb3256d55d6091d82'))
      .then(() => {
        const expectedActions = [
          {type: actions.GET_TODO_LIST_BEGIN},
          {
            type: actions.GET_TODO_LIST_SUCCESS,
            payload: {todolist: [{name: 'Test ToDo List'}]},
          },
        ];
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('creates GET_TODO_LIST_FAILURE when fetching todolist has failed', () => {
    mockAxios.onGet('/todolist/trip/5e6aeefdb3256d55d6091d82').reply(500);

    return store
      .dispatch(actions.fetchToDoList('5e6aeefdb3256d55d6091d82'))
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', 'GET_TODO_LIST_BEGIN');
        expect(actions[1]).toHaveProperty('type', 'GET_TODO_LIST_FAILURE');
      });
  });
});
