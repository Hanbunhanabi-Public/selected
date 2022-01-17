import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import expect from 'expect';
import * as actions from '../../../src/actions/Event/deleteEvent';
import {url} from '../../../src/utils/globalVars';

const middleware = [thunk];
const mockStore = configureMockStore(middleware);
const mockAxios = new MockAdapter(axios);
const store = mockStore({});

describe('delete event actions', () => {
  beforeEach(() => {
    store.clearActions();
  });

  it('issues DELETE_EVENT_FAILURE when deleting an event has failed', () => {
    const testEventID = 12345;
    mockAxios.onDelete(url + `/event/delete/${testEventID}/`).reply(500);

    return store.dispatch(actions.deleteEvent()).then(() => {
      const storeActions = store.getActions();
      expect(storeActions[0]).toHaveProperty('type', 'DELETE_EVENT_BEGIN');
      expect(storeActions[1]).toHaveProperty('type', 'DELETE_EVENT_FAILURE');
    });
  });
});
