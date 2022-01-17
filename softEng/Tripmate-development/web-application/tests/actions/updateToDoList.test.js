import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import expect from 'expect';
import * as actions from '../../src/actions/todo/updateToDoList';

const middleware = [thunk];
const mockStore = configureMockStore(middleware);
const mockAxios = new MockAdapter(axios);
const store = mockStore({});

describe('update todolist actions', () => {
  beforeEach(() => {
    store.clearActions();
  });

  it('creates UPDATE_TODO_LIST_FAILURE when updating todolist has failed', () => {
    const testListID = 12345;
    mockAxios.onPost(`/todolist/update/${testListID}`).reply(500);

    return store.dispatch(actions.updateToDoList()).then(() => {
      const storeActions = store.getActions();
      expect(storeActions[0]).toHaveProperty('type', 'UPDATE_TODO_LIST_BEGIN');
      expect(storeActions[1]).toHaveProperty(
        'type',
        'UPDATE_TODO_LIST_FAILURE',
      );
    });
  });
});
