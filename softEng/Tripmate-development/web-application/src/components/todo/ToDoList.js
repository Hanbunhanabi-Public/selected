import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Box, CircularProgress} from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import {fetchToDoList} from '../../actions/todo/fetchToDoList';
import {deleteToDoList} from '../../actions/todo/deleteToDoList';
import {updateToDoList} from '../../actions/todo/updateToDoList';
import {createToDoItem} from '../../actions/todo/createToDoItem';
import {deleteToDoItem} from '../../actions/todo/deleteToDoItem';
import {updateToDoItem} from '../../actions/todo/updateToDoItem';
import {TodoCard} from './TodoCard';

export const ToDoList = props => {
  useEffect(() => {
    props.dispatch(fetchToDoList(props.tripId));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (
      (!props.createListLoading && props.createListError == null) ||
      (!props.createItemLoading && props.createItemError == null)
    ) {
      props.dispatch(fetchToDoList(props.tripId));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.createListLoading, props.createItemLoading]);

  useEffect(() => {
    if (
      (!props.deleteListLoading && props.deleteListError == null) ||
      (!props.deleteItemLoading && props.deleteItemError == null)
    ) {
      props.dispatch(fetchToDoList(props.tripId));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.deleteListLoading, props.deleteItemLoading]);

  useEffect(() => {
    if (
      (!props.updateListLoading && props.updateListError == null) ||
      (!props.updateItemLoading && props.updateItemError == null)
    ) {
      props.dispatch(fetchToDoList(props.tripId));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.updateListLoading, props.updateItemLoading]);

  const handleDeleteToDoList = listID => {
    props.dispatch(deleteToDoList(listID));
  };

  const handleUpdateToDoList = (listID, todoListName) => {
    props.dispatch(updateToDoList(listID, todoListName));
  };

  const handleCreateToDoItem = (listID, itemName) => {
    props.dispatch(createToDoItem(listID, itemName));
  };

  const handleDeleteToDoItem = (listID, itemID) => {
    props.dispatch(deleteToDoItem(listID, itemID));
  };

  const handleUpdateToDoItemStatus = (listID, itemID, itemContent) => event => {
    props.dispatch(
      updateToDoItem(listID, itemID, itemContent, event.target.checked),
    );
  };

  const handleUpdateToDoItemContent = (
    listID,
    itemID,
    itemName,
    itemStatus,
  ) => {
    props.dispatch(updateToDoItem(listID, itemID, itemName, itemStatus));
  };

  return !props.loading ? (
    <Box display="flex" flexWrap="wrap">
      {props.todolist.map(todolist => (
        <TodoCard
          key={todolist._id}
          todolist={todolist}
          updateTodoItemStatus={handleUpdateToDoItemStatus}
          updateTodoItemName={handleUpdateToDoItemContent}
          createTodoItem={handleCreateToDoItem}
          deleteTodoItem={handleDeleteToDoItem}
          deleteTodoList={handleDeleteToDoList}
          updateTodoList={handleUpdateToDoList}
        />
      ))}
      {props.todolist.length < 1 ? (
        <Box display="flex" alignItems="center">
          <Typography variant="h6" component="h2">
            You currently do not have any to-do lists.
          </Typography>
        </Box>
      ) : null}
    </Box>
  ) : (
    <CircularProgress />
  );
};

ToDoList.propTypes = {
  tripId: PropTypes.string.isRequired,
  dispatch: PropTypes.func,
  todolist: PropTypes.array,
  loading: PropTypes.bool,
  createListMessage: PropTypes.string,
  createListLoading: PropTypes.bool,
  createListError: PropTypes.string,
  deleteListMessage: PropTypes.string,
  deleteListLoading: PropTypes.bool,
  deleteListError: PropTypes.string,
  updateListMessage: PropTypes.string,
  updateListLoading: PropTypes.bool,
  updateListError: PropTypes.string,
  createItemMessage: PropTypes.string,
  createItemLoading: PropTypes.bool,
  createItemError: PropTypes.string,
  deleteItemMessage: PropTypes.string,
  deleteItemLoading: PropTypes.bool,
  deleteItemError: PropTypes.string,
  updateItemMessage: PropTypes.string,
  updateItemLoading: PropTypes.bool,
  updateItemError: PropTypes.shape({}),
};

const mapStateToProps = state => ({
  todolist: state.todolist.getToDoList.todolist,
  loading: state.todolist.getToDoList.loading,
  error: state.todolist.getToDoList.error,
  createListMessage: state.todolist.createToDoList.createSuccessMessage,
  createListLoading: state.todolist.createToDoList.createLoading,
  createListError: state.todolist.createToDoList.createError,
  deleteListMessage: state.todolist.deleteToDoList.deleteSuccessMessage,
  deleteListLoading: state.todolist.deleteToDoList.deleteLoading,
  deleteListError: state.todolist.deleteToDoList.deleteError,
  updateListMessage: state.todolist.updateToDoList.updateSuccessMessage,
  updateListLoading: state.todolist.updateToDoList.updateLoading,
  updateListError: state.todolist.updateToDoList.updateError,
  createItemMessage: state.todolist.createToDoItem.createSuccessMessage,
  createItemLoading: state.todolist.createToDoItem.createLoading,
  createItemError: state.todolist.createToDoItem.createError,
  deleteItemMessage: state.todolist.deleteToDoItem.deleteSuccessMessage,
  deleteItemLoading: state.todolist.deleteToDoItem.deleteLoading,
  deleteItemError: state.todolist.deleteToDoItem.deleteError,
  updateItemMessage: state.todolist.updateToDoItem.updateSuccessMessage,
  updateItemLoading: state.todolist.updateToDoItem.updateLoading,
  updateItemError: state.todolist.updateToDoItem.updateError,
});

export default connect(mapStateToProps)(ToDoList);
