import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import expect from 'expect';
import * as actions from '../../src/actions/todo/deleteToDoItem';

const middleware = [thunk];
const mockStore = configureMockStore(middleware);
const mockAxios = new MockAdapter(axios);
const store = mockStore({});

describe('delete todoitem actions', () => {
  beforeEach(() => {
    store.clearActions();
  });

  it('creates DELETE_TODO_ITEM_FAILURE when deleting todoitem has failed', () => {
    const testListID = 12345;
    const testItemID = 12345;
    mockAxios
      .onDelete(`/todolist/${testListID}/todoitem/${testItemID}`)
      .reply(500);

    return store.dispatch(actions.deleteToDoItem()).then(() => {
      const storeActions = store.getActions();
      expect(storeActions[0]).toHaveProperty('type', 'DELETE_TODO_ITEM_BEGIN');
      expect(storeActions[1]).toHaveProperty(
        'type',
        'DELETE_TODO_ITEM_FAILURE',
      );
    });
  });
});
