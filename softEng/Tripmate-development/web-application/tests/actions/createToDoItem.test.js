import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import expect from 'expect';
import * as actions from '../../src/actions/todo/createToDoItem';

const middleware = [thunk];
const mockStore = configureMockStore(middleware);
const mockAxios = new MockAdapter(axios);
const store = mockStore({});

describe('add todoitem actions', () => {
  beforeEach(() => {
    store.clearActions();
  });

  it('creates CREATE_TODO_ITEM_FAILURE when creating todoitem has failed', () => {
    const testListID = 12345;
    mockAxios.onPost(`/todolist/${testListID}/todoitem/add`).reply(500);

    return store.dispatch(actions.createToDoItem()).then(() => {
      const storeActions = store.getActions();
      expect(storeActions[0]).toHaveProperty('type', 'CREATE_TODO_ITEM_BEGIN');
      expect(storeActions[1]).toHaveProperty(
        'type',
        'CREATE_TODO_ITEM_FAILURE',
      );
    });
  });
});
