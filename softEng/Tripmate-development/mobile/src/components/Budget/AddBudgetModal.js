import React from 'react';
import PropTypes from 'prop-types';
import styles from '../../styles/Style';
import {Button, Form, Item, Input, Label} from 'native-base';
import {View, Text} from 'react-native';
import Modal from 'react-native-modal';
import {addBudget} from '../../actions/Budget/addBudget';
import {connect} from 'react-redux';

export class AddBudgetModal extends React.Component {
  constructor(props) {
    super(props);
  }

  handleAddBudget(newBudget) {
    this.props.addBudget(newBudget);
  }

  render() {
    return (
      <Modal
        isVisible={this.props.visible}
        animationIn="slideInUp"
        animationOut="slideOutDown"
        style={styles.extraSmallModal}>
        <View style={styles.modalView}>
          <Text style={styles.modalHeader}>Add Budget</Text>
        </View>
        <Form>
          <Item stackedLabel>
            <Label>Amount</Label>
            <Input
              onChangeText={textEntry => {
                this.budgetAmount = textEntry;
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
              this.handleAddBudget(this.budgetAmount);
              this.props.cancelFunc();
            }}>
            <Text style={styles.buttonWithWhiteText}>
              {'    '}SAVE{'    '}
            </Text>
          </Button>
        </View>
      </Modal>
    );
  }
}

AddBudgetModal.propTypes = {
  visible: PropTypes.bool,
  cancelFunc: PropTypes.func,
};

const mapDispatchToProps = dispatch => ({
  addBudget: newBudget => dispatch(addBudget(newBudget)),
});

export default connect(
  null,
  mapDispatchToProps,
)(AddBudgetModal);
