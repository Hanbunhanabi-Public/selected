import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import expect from 'expect';
import * as actions from '../../src/actions/todo/updateToDoItem';

const middleware = [thunk];
const mockStore = configureMockStore(middleware);
const mockAxios = new MockAdapter(axios);
const store = mockStore({});

describe('update todoitem actions', () => {
  beforeEach(() => {
    store.clearActions();
  });

  it('creates UPDATE_TODO_ITEM_FAILURE when updating todoitem has failed', () => {
    const testListID = 12345;
    const testItemID = 12345;
    mockAxios
      .onPost(`/todolist/${testListID}/todoitem/update/${testItemID}`)
      .reply(500);

    return store.dispatch(actions.updateToDoItem()).then(() => {
      const storeActions = store.getActions();
      expect(storeActions[0]).toHaveProperty('type', 'UPDATE_TODO_ITEM_BEGIN');
      expect(storeActions[1]).toHaveProperty(
        'type',
        'UPDATE_TODO_ITEM_FAILURE',
      );
    });
  });
});
