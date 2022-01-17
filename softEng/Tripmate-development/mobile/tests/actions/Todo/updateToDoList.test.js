import configureMockStore from 'redux-mock-store';
import trunk from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import expect from 'expect';
import * as actions from '../../../src/actions/Todo/updateToDoList';
import {url} from '../../../src/utils/globalVars';

const middleware = [trunk];
const mockStore = configureMockStore(middleware);
const mockAxios = new MockAdapter(axios);
const store = mockStore({});

describe('update todolist actions', () => {
  beforeEach(() => {
    store.clearActions();
  });
  it('creates UPDATE_TODO_LIST_SUCCESS when update todo list has been done', () => {
    mockAxios
      .onPost(url + '/todolist/update/5e4f6675eddfd25ef052f9c0')
      .reply(200, [
        {
          data: 'Todo List updated.',
        },
      ]);
    return store
      .dispatch(actions.updateToDoList('5e4f6675eddfd25ef052f9c0', 60))
      .then(() => {
        const expectedActions = [
          {type: actions.UPDATE_TODO_LIST_BEGIN},
          {
            type: actions.UPDATE_TODO_LIST_SUCCESS,
            payload: {
              successMessage: [
                {
                  data: 'Todo List updated.',
                },
              ],
            },
          },
        ];
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('creates UPDATE_TODO_LIST_FAILURE when update todo list has failed', () => {
    mockAxios.onPost(url + '/todolist/update/').reply(500);

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
