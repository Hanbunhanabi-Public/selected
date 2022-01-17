import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import expect from 'expect';
import * as actions from '../../../src/actions/Event/updateEvent';
import {url} from '../../../src/utils/globalVars';

const middleware = [thunk];
const mockStore = configureMockStore(middleware);
const mockAxios = new MockAdapter(axios);
const store = mockStore({});

describe('update event actions', () => {
  beforeEach(() => {
    store.clearActions();
  });

  it('creates UPDATE_EVENT_FAILURE when updating event has failed', () => {
    const eventID = 12345;
    mockAxios.onPost(url + `/event/update/${eventID}`).reply(500);

    return store.dispatch(actions.updateEvent()).then(() => {
      const storeActions = store.getActions();
      expect(storeActions[0]).toHaveProperty('type', 'UPDATE_EVENT_BEGIN');
      expect(storeActions[1]).toHaveProperty('type', 'UPDATE_EVENT_FAILURE');
    });
  });
});
