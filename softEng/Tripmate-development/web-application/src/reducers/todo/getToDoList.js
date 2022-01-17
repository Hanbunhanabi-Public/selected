import {
  GET_TODO_LIST_BEGIN,
  GET_TODO_LIST_SUCCESS,
  GET_TODO_LIST_FAILURE,
} from '../../actions/todo/fetchToDoList';
import createReducer from '../createReducer';

const initialState = {
  todolist: [],
  loading: true,
  error: null,
};

const toDoListBeginState = state => ({
  ...state,
  loading: true,
  error: null,
});

const toDoListSuccessState = (state, action) => ({
  ...state,
  todolist: action.payload.todolist,
  loading: false,
});

const toDoListFailureState = (state, action) => ({
  ...state,
  todolist: [],
  loading: false,
  error: action.payload.error,
});

const getToDoList = createReducer(initialState, {
  [GET_TODO_LIST_BEGIN]: toDoListBeginState,
  [GET_TODO_LIST_SUCCESS]: toDoListSuccessState,
  [GET_TODO_LIST_FAILURE]: toDoListFailureState,
});

export default getToDoList;
