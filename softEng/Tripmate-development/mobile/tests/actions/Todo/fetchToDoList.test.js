import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import expect from 'expect';
import * as actions from '../../../src/actions/Todo/fetchTodoList';
import {url} from '../../../src/utils/globalVars';

const middleware = [thunk];
const mockStore = configureMockStore(middleware);
const mockAxios = new MockAdapter(axios);
const store = mockStore({});

describe('fetch todo list actions', () => {
  beforeEach(() => {
    store.clearActions();
  });

  it('creates GET_TODO_LIST_SUCCESS when fetching todo list has been done', () => {
    mockAxios
      .onGet(url + '/todolist/trip/5e6aeefdb3256d55d6091d82')
      .reply(200, [{name: 'Test todo list title'}]);

    return store
      .dispatch(actions.fetchToDoList('5e6aeefdb3256d55d6091d82'))
      .then(() => {
        const expectedActions = [
          {type: actions.GET_TODO_LIST_BEGIN},
          {
            type: actions.GET_TODO_LIST_SUCCESS,
            payload: {todolist: [{name: 'Test todo list title'}]},
          },
        ];
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('creates GET_TODO_LIST_FAILURE when fetching todo list has failed', () => {
    mockAxios.onGet(url + '/todolist/trip/5e6aeefdb3256d55d6091d82').reply(500);

    return store
      .dispatch(actions.fetchToDoList('5e6aeefdb3256d55d6091d82'))
      .then(() => {
        const storeActions = store.getActions();
        expect(storeActions[0]).toHaveProperty('type', 'GET_TODO_LIST_BEGIN');
        expect(storeActions[1]).toHaveProperty('type', 'GET_TODO_LIST_FAILURE');
      });
  });
});
