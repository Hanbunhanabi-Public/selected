import React from 'react';
import PropTypes from 'prop-types';
import styles from '../../styles/Style';
import {fetchToDoList} from '../../actions/Todo/fetchTodoList';
import {deleteToDoList} from '../../actions/Todo/deleteToDoList';
import {deleteToDoItem} from '../../actions/Todo/deleteToDoItem';
import {updateToDoList} from '../../actions/Todo/updateToDoList';
import {updateToDoItem} from '../../actions/Todo/updateToDoItem';
import {connect} from 'react-redux';
import ConnectedAddTodoItemModal from './AddTodoItemModal';
import {
  List,
  ListItem,
  Separator,
  CheckBox,
  Text,
  Button,
  Icon,
  View,
  Spinner,
  Input,
} from 'native-base';

export class ToDoList extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchToDoList(this.props.trip._id);
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.deleteListLoading !== this.props.deleteListLoading ||
      prevProps.updateListLoading !== this.props.updateListLoading ||
      prevProps.createListLoading !== this.props.createListLoading ||
      prevProps.deleteItemLoading !== this.props.deleteItemLoading ||
      prevProps.updateItemLoading !== this.props.updateItemLoading ||
      prevProps.createItemLoading !== this.props.createItemLoading
    ) {
      this.props.fetchToDoList(this.props.trip._id);
    }
  }

  handleUpdateToDoList(todolistid, newTodolist) {
    this.props.updateToDoList(todolistid, newTodolist);
  }

  handleUpdateToDoItem(listId, itemId, newTodoItem, newTodoItemState) {
    this.props.updateToDoItem(listId, itemId, newTodoItem, newTodoItemState);
  }

  render() {
    return !this.props.loading ? (
      <View>
        {this.props.todolist.length === 0 && (
          <Text>You don't have any todo lists.</Text>
        )}
        {this.props.todolist.map(todolist => (
          <List key={todolist._id}>
            <ListItem itemDivider style={styles.todoListBanner}>
              <Input
                onChangeText={textEntry => {
                  this.newToDoList = textEntry;
                }}>
                <Text style={styles.listTitle}>{todolist.name}</Text>
              </Input>
              <Button
                onPress={() => {
                  this.handleUpdateToDoList(todolist._id, this.newToDoList);
                }}
                small
                transparent
                iconLeft
                light>
                <Icon style={styles.listIcon} name="save" />
              </Button>
              <Button
                onPress={() => {
                  this.props.deleteToDoList(todolist._id);
                }}
                small
                transparent
                iconLeft
                light
                style={styles.listButton}>
                <Icon style={styles.listIcon} name="md-remove-circle" />
              </Button>
            </ListItem>
            {todolist.items.map(todoitem => (
              <View key={todoitem._id}>
                <ListItem style={styles.todoItem}>
                  <CheckBox
                    checked={todoitem.done}
                    onPress={() => {
                      this.handleUpdateToDoItem(
                        todolist._id,
                        todoitem._id,
                        todoitem.content,
                        !todoitem.done,
                      );
                    }}
                    color="#3f51b5"
                  />
                  <Input
                    onChangeText={textEntry => {
                      this.todoItemContent = textEntry;
                    }}>
                    <Text>{todoitem.content}</Text>
                  </Input>
                  <Button
                    onPress={() => {
                      this.handleUpdateToDoItem(
                        todolist._id,
                        todoitem._id,
                        this.todoItemContent,
                        todoitem.done,
                      );
                    }}
                    small
                    transparent
                    primary
                    iconLeft
                    light>
                    <Icon name="save" />
                  </Button>
                  <Button
                    onPress={() => {
                      this.props.deleteToDoItem(todolist._id, todoitem._id);
                    }}
                    small
                    transparent
                    light>
                    <Icon name="md-remove-circle" />
                  </Button>
                </ListItem>
              </View>
            ))}
            <ConnectedAddTodoItemModal list={todolist} />
            <Separator style={styles.separator} />
          </List>
        ))}
      </View>
    ) : (
      <Spinner />
    );
  }
}

ToDoList.propTypes = {
  trip: PropTypes.object,
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
  updateItemError: PropTypes.string,
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
  createItemMessage: state.todoitem.createToDoItem.createSuccessMessage,
  createItemLoading: state.todoitem.createToDoItem.createLoading,
  createItemError: state.todoitem.createToDoItem.createError,
  deleteItemMessage: state.todoitem.deleteToDoItem.deleteSuccessMessage,
  deleteItemLoading: state.todoitem.deleteToDoItem.deleteLoading,
  deleteItemError: state.todoitem.deleteToDoItem.deleteError,
  updateItemMessage: state.todoitem.updateToDoItem.updateSuccessMessage,
  updateItemLoading: state.todoitem.updateToDoItem.updateLoading,
  updateItemError: state.todoitem.updateToDoItem.updateError,
});

const mapDispatchToProps = dispatch => ({
  fetchToDoList: tripId => dispatch(fetchToDoList(tripId)),
  deleteToDoList: targetListid => dispatch(deleteToDoList(targetListid)),
  deleteToDoItem: (listId, itemId) => dispatch(deleteToDoItem(listId, itemId)),
  updateToDoList: (listId, newTodoList) =>
    dispatch(updateToDoList(listId, newTodoList)),
  updateToDoItem: (listId, itemId, newTodoItem, newTodoItemState) =>
    dispatch(updateToDoItem(listId, itemId, newTodoItem, newTodoItemState)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ToDoList);
