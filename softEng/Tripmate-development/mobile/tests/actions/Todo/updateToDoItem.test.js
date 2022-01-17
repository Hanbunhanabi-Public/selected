import configureMockStore from 'redux-mock-store';
import trunk from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import expect from 'expect';
import * as actions from '../../../src/actions/Todo/updateToDoItem';
import {url} from '../../../src/utils/globalVars';

const middleware = [trunk];
const mockStore = configureMockStore(middleware);
const mockAxios = new MockAdapter(axios);
const store = mockStore({});

describe('update todo item actions', () => {
  beforeEach(() => {
    store.clearActions();
  });
  it('creates UPDATE_TODO_ITEM_SUCCESS when update todo item has been done', () => {
    mockAxios
      .onPost(
        url +
          '/todolist/5e4f6675eddfd25ef052f9c0/todoitem/update/5e4f6675eddfd25ef052f9c1',
      )
      .reply(200, [
        {
          data: 'Todo item updated.',
        },
      ]);
    return store
      .dispatch(
        actions.updateToDoItem(
          '5e4f6675eddfd25ef052f9c0',
          '5e4f6675eddfd25ef052f9c1',
          50,
          false,
        ),
      )
      .then(() => {
        const expectedActions = [
          {type: actions.UPDATE_TODO_ITEM_BEGIN},
          {
            type: actions.UPDATE_TODO_ITEM_SUCCESS,
            payload: {
              successMessage: [
                {
                  data: 'Todo item updated.',
                },
              ],
            },
          },
        ];
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('creates UPDATE_TODO_ITEM_FAILURE when update todo item has failed', () => {
    mockAxios
      .onPost(url + '/todolist/5e4f6675eddfd25ef052f9c0/todoitem/update/')
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
