import {
  GET_TODO_LIST_BEGIN,
  GET_TODO_LIST_SUCCESS,
  GET_TODO_LIST_FAILURE,
} from '../../actions/Todo/fetchTodoList';
import createReducer from '../createReducer';

const initialState = {
  todolist: [],
  loading: false,
  error: null,
};

const getToDoListBeginState = state => ({
  ...state,
  loading: true,
  error: null,
});

const getToDoListSuccessState = (state, action) => ({
  ...state,
  todolist: action.payload.todolist,
  loading: false,
});

const getToDoListFailureState = (state, action) => ({
  ...state,
  todolist: [],
  loading: false,
  error: action.payload.error,
});

const getToDoList = createReducer(initialState, {
  [GET_TODO_LIST_BEGIN]: getToDoListBeginState,
  [GET_TODO_LIST_SUCCESS]: getToDoListSuccessState,
  [GET_TODO_LIST_FAILURE]: getToDoListFailureState,
});

export default getToDoList;
