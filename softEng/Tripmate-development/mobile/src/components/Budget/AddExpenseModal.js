import React from 'react';
import PropTypes from 'prop-types';
import styles from '../../styles/Style';
import {Button, Form, Item, Input, Label} from 'native-base';
import {View, Text, ScrollView} from 'react-native';
import Modal from 'react-native-modal';
import {addExpenses} from '../../actions/Budget/addExpenses';
import {updateExpenses} from '../../actions/Budget/updateExpenses';
import {connect} from 'react-redux';
import {fetchBudgetList} from '../../actions/Budget/fetchBudgetList';

export class AddExpenseModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nameChanged: false,
      amountChanged: false,
    };
  }

  handleAddExpenses(id, newExpenses) {
    this.props.addExpenses(id, newExpenses);
  }

  handleUpdateExpenses(budgetId, expensesId, updatedExpense) {
    this.props.updateExpenses(budgetId, expensesId, updatedExpense);
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
            <Text onfocus style={styles.modalHeader}>
              {`${this.props.expense ? 'Update' : 'Add'}`} Expense
            </Text>
          </View>
          <Form>
            <Item stackedLabel>
              <Label>Expense Name</Label>
              <Input
                defaultValue={this.props.expense ? this.props.expense.name : ''}
                onChangeText={textEntry => {
                  this.setState({nameChanged: true});
                  this.expenseName = textEntry;
                }}
              />
            </Item>
            <Item stackedLabel>
              <Label>Amount</Label>
              <Input
                defaultValue={
                  this.props.expense ? '' + this.props.expense.amount : ''
                }
                onChangeText={textEntry => {
                  this.setState({amountChanged: true});
                  this.expenseAmount = textEntry;
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
                this.props.cancelFunc();
                if (this.props.expense) {
                  this.handleUpdateExpenses(
                    this.props.budget._id,
                    this.props.expense._id,
                    {
                      name: this.state.nameChanged
                        ? this.expenseName
                        : this.props.expense.name,
                      amount: this.state.amountChanged
                        ? this.expenseAmount
                        : this.props.expense.amount,
                      isDone: this.props.expense.isDone,
                    },
                  );
                } else {
                  this.props.fetchBudgetList(this.props.trip._id);
                  this.handleAddExpenses(this.props.fetchedBudget._id, {
                    name: this.expenseName,
                    amount: this.expenseAmount,
                    isDone: false,
                  });
                }
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

AddExpenseModal.propTypes = {
  visible: PropTypes.bool,
  cancelFunc: PropTypes.func,
  trip: PropTypes.object,
  expense: PropTypes.object,
  fetchBudgetList: PropTypes.func,
  fetchedBudget: PropTypes.array,
  budget: PropTypes.object,
};

const mapStateToProps = state => ({
  fetchedBudget: state.budget.getBudgetList.budget,
});

const mapDispatchToProps = dispatch => ({
  fetchBudgetList: tripId => dispatch(fetchBudgetList(tripId)),
  addExpenses: (id, newExpenses) => dispatch(addExpenses(id, newExpenses)),
  updateExpenses: (budgetId, expensesId, updatedExpense) =>
    dispatch(updateExpenses(budgetId, expensesId, updatedExpense)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddExpenseModal);
