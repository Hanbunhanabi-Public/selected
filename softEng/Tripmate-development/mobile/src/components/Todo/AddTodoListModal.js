import React from 'react';
import PropTypes from 'prop-types';
import styles from '../../styles/Style';
import {Button, Form, Item, Input, Label} from 'native-base';
import {View, Text, ScrollView} from 'react-native';
import Modal from 'react-native-modal';
import {createToDoList} from '../../actions/Todo/createToDoList';
import {connect} from 'react-redux';

export class AddTodoListModal extends React.Component {
  constructor(props) {
    super(props);
  }

  handleAddToDoList(tripId, listName) {
    this.props.createToDoList(tripId, listName);
  }

  render() {
    return (
      <Modal
        isVisible={this.props.visible}
        animationIn="slideInUp"
        animationOut="slideOutDown"
        style={styles.smallModal}>
        <ScrollView>
          <View style={styles.modalView}>
            <Text style={styles.modalHeader}>Add Todo List</Text>
          </View>
          <Form>
            <Item stackedLabel>
              <Label>List Name</Label>
              <Input
                onChangeText={textEntry => {
                  this.listname = textEntry;
                }}
              />
            </Item>
          </Form>
          <View style={styles.modalButtonView}>
            <Button small transparent onPress={this.props.cancelFunc}>
              <Text style={styles.deleteButton}>
                {'  '}CANCEL{'  '}
              </Text>
            </Button>
            <Button
              small
              onPress={() => {
                this.handleAddToDoList(this.props.trip._id, this.listname);
                this.props.cancelFunc();
              }}>
              <Text style={styles.buttonWithWhiteText}>
                {'    '}SAVE{'    '}
              </Text>
            </Button>
          </View>
        </ScrollView>
      </Modal>
    );
  }
}

AddTodoListModal.propTypes = {
  visible: PropTypes.bool,
  cancelFunc: PropTypes.func,
  trip: PropTypes.object,
};

const mapDispatchToProps = dispatch => ({
  createToDoList: (tripId, listName) =>
    dispatch(createToDoList(tripId, listName)),
});

export default connect(
  null,
  mapDispatchToProps,
)(AddTodoListModal);
