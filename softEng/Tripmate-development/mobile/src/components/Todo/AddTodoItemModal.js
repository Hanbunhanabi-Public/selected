import React from 'react';
import styles from '../../styles/Style';
import PropTypes from 'prop-types';
import {createToDoItem} from '../../actions/Todo/createToDoItem';
import {connect} from 'react-redux';

import {ListItem, Button, Icon, View, Input} from 'native-base';

export class AddTodoItemModal extends React.Component {
  constructor(props) {
    super(props);
  }

  handleAddToDoItem(listId, itemContent) {
    this.props.createToDoItem(listId, itemContent);
  }

  render() {
    return (
      <View>
        <ListItem style={styles.addTodoItem}>
          <Input
            onChangeText={textEntry => {
              this.todoItemContent = textEntry;
            }}
            placeholder="Add a new item"
          />
          <Button
            onPress={() => {
              this.handleAddToDoItem(this.props.list._id, this.todoItemContent);
            }}
            small
            transparent
            iconLeft
            light
            style={styles.addTodoItemButton}>
            <Icon name="add" />
          </Button>
        </ListItem>
      </View>
    );
  }
}

AddTodoItemModal.propTypes = {
  list: PropTypes.object,
};

const mapDispatchToProps = dispatch => ({
  createToDoItem: (listId, itemContent) =>
    dispatch(createToDoItem(listId, itemContent)),
});

export default connect(
  null,
  mapDispatchToProps,
)(AddTodoItemModal);
