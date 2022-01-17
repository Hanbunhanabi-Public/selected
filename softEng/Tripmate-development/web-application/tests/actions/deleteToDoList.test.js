import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import expect from 'expect';
import * as actions from '../../src/actions/todo/deleteToDoList';

const middleware = [thunk];
const mockStore = configureMockStore(middleware);
const mockAxios = new MockAdapter(axios);
const store = mockStore({});

describe('delete todolist actions', () => {
  beforeEach(() => {
    store.clearActions();
  });

  it('creates DELETE_TODO_LIST_FAILURE when deleting todolist has failed', () => {
    mockAxios.onDelete('/todolist').reply(500);

    return store.dispatch(actions.deleteToDoList()).then(() => {
      const storeActions = store.getActions();
      expect(storeActions[0]).toHaveProperty('type', 'DELETE_TODO_LIST_BEGIN');
      expect(storeActions[1]).toHaveProperty(
        'type',
        'DELETE_TODO_LIST_FAILURE',
      );
    });
  });
});
