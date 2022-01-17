import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import expect from 'expect';
import * as actions from '../../src/actions/todo/createToDoList';

const middleware = [thunk];
const mockStore = configureMockStore(middleware);
const mockAxios = new MockAdapter(axios);
const store = mockStore({});

describe('add todolist actions', () => {
  beforeEach(() => {
    store.clearActions();
  });

  it('creates CREATE_TODO_LIST_SUCCESS when creating todolist has been done', () => {
    mockAxios
      .onPost('/todolist/add/5e6aeefdb3256d55d6091d82')
      .reply(200, 'New ToDo List Added!');

    return store
      .dispatch(actions.createToDoList('5e6aeefdb3256d55d6091d82'))
      .then(() => {
        const expectedActions = [
          {type: actions.CREATE_TODO_LIST_BEGIN},
          {
            type: actions.CREATE_TODO_LIST_SUCCESS,
            payload: {
              successMessage: 'New ToDo List Added!',
            },
          },
        ];
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('creates CREATE_TODO_LIST_FAILURE when creating todolist has failed', () => {
    mockAxios.onPost('/todolist/add/5e6aeefdb3256d55d6091d82').reply(500);

    return store
      .dispatch(actions.createToDoList('5e6aeefdb3256d55d6091d82'))
      .then(() => {
        const storeActions = store.getActions();
        expect(storeActions[0]).toHaveProperty(
          'type',
          'CREATE_TODO_LIST_BEGIN',
        );
        expect(storeActions[1]).toHaveProperty(
          'type',
          'CREATE_TODO_LIST_FAILURE',
        );
      });
  });
});
