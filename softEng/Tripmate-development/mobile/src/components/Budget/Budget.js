import React from 'react';
import styles from '../../styles/Style';
import PropTypes from 'prop-types';
import {deleteExpenses} from '../../actions/Budget/deleteExpenses';
import {updateBudget} from '../../actions/Budget/updateBudget';
import {fetchBudgetList} from '../../actions/Budget/fetchBudgetList';
import {fetchExpenseSummary} from '../../actions/Budget/fetchExpenseSummary';
import {connect} from 'react-redux';
import {fetchExpensesList} from '../../actions/Budget/fetchExpensesList';
import {fetchExpenses} from '../../actions/Budget/fetchExpenses';
import {updateExpenses} from '../../actions/Budget/updateExpenses';
import {
  List,
  ListItem,
  Separator,
  Button,
  Text,
  Icon,
  View,
  Input,
  Spinner,
  CheckBox,
} from 'native-base';
import ConnectedAddExpenseModal from './AddExpenseModal';

export class Budget extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      updateExpenseModalVisible: false,
      chosenBudget: null,
      chosenExpense: null,
      budgetSummaris: [],
    };
  }

  componentDidMount() {
    this.props.fetchBudgetList(this.props.trip._id);
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.uploading !== this.props.uploading ||
      prevProps.deleting !== this.props.deleting
    ) {
      this.props.fetchBudgetList(this.props.trip._id);
    }
    if (prevProps.loading !== this.props.loading) {
      this.props.fetchExpenseSummary(this.props.budget._id);
    }
    if (
      prevProps.budgetUpdating !== this.props.budgetUpdating ||
      prevProps.expensesUploading !== this.props.expensesUploading ||
      prevProps.expensesUpdating !== this.props.expensesUpdating ||
      prevProps.expensesDeleting !== this.props.expensesDeleting
    ) {
      this.props.fetchExpenseSummary(this.props.budget._id);
      this.props.fetchBudgetList(this.props.trip._id);
    }
  }

  setUpdateExpenseModalVisible(visible) {
    this.setState({updateExpenseModalVisible: visible});
  }

  handleDeleteExpenses(id, targetExpenses) {
    this.props.deleteExpenses(id, targetExpenses);
  }

  handleBudgetUpdate(id, newBudget) {
    this.props.updateBudget(id, newBudget);
  }

  markExpenseAsDone(budgetId, expense) {
    this.props.updateExpenses(budgetId, expense._id, {
      name: expense.name,
      amount: expense.amount,
      isDone: true,
    });
  }

  render() {
    return !this.props.loading ? (
      <View>
        <List key={this.props.budget._id}>
          <ListItem itemDivider style={styles.inputListBanner}>
            <Input
              onChangeText={textEntry => {
                this.newBudgetAmount = textEntry;
              }}>
              <Text style={styles.listTitle}>{this.props.budget.budget}</Text>
            </Input>
            <Button
              onPress={() => {
                this.handleBudgetUpdate(
                  this.props.budget._id,
                  this.newBudgetAmount,
                );
              }}
              small
              transparent
              iconLeft
              light>
              <Icon style={styles.listIcon} name="save" />
            </Button>
          </ListItem>
          <ListItem style={styles.budgetSummaryHolder}>
            <View>
              <Text>Available</Text>
              <Text>{this.props.summary.available}</Text>
            </View>
            <View>
              <Text>Planned</Text>
              <Text>{this.props.summary.planned}</Text>
            </View>
            <View>
              <Text>Used</Text>
              <Text>{this.props.summary.used}</Text>
            </View>
          </ListItem>
          {this.props.budget.expenses &&
            this.props.budget.expenses.map(expense => (
              <List key={expense._id}>
                <ListItem style={styles.expenseHolder}>
                  <CheckBox
                    checked={expense.isDone}
                    onPress={() => {
                      this.markExpenseAsDone(this.props.budget._id, expense);
                    }}
                    color="#3f51b5"
                  />
                  <Text>{expense.name}</Text>
                  <Text>{expense.amount}</Text>
                  <View style={styles.listButtons}>
                    <Button
                      onPress={() => {
                        this.setState({
                          chosenBudget: this.props.budget,
                          chosenExpense: expense,
                        });
                        this.setUpdateExpenseModalVisible(true);
                      }}
                      small
                      transparent
                      primary
                      iconLeft
                      light>
                      <Icon name="md-create" />
                    </Button>
                    <Button
                      onPress={() => {
                        this.handleDeleteExpenses(
                          this.props.budget._id,
                          expense,
                        );
                      }}
                      small
                      transparent
                      light>
                      <Icon name="md-remove-circle" />
                    </Button>
                  </View>
                </ListItem>
                <ConnectedAddExpenseModal
                  visible={this.state.updateExpenseModalVisible}
                  cancelFunc={() =>
                    this.setUpdateExpenseModalVisible(
                      !this.state.updateExpenseModalVisible,
                    )
                  }
                  budget={this.state.chosenBudget}
                  expense={this.state.chosenExpense}
                />
              </List>
            ))}
          <Separator style={styles.separator} />
        </List>
      </View>
    ) : (
      <Spinner />
    );
  }
}

Budget.Prototype = {
  trip: PropTypes.object,
  fetchBudgetList: PropTypes.func,
  budget: PropTypes.array,
  loading: PropTypes.bool,

  fetchExpenseSummary: PropTypes.func,
  summary: PropTypes.Object,
  summaryLoading: PropTypes.bool,
  summaryError: PropTypes.string,
  //get sorted expenses
  fetchExpensesList: PropTypes.func,
  expensesList: PropTypes.array,
  expensesListLoading: PropTypes.bool,
  expensesListError: PropTypes.string,

  fetchExpenses: PropTypes.func,
  expenses: PropTypes.object,
  expensesLoading: PropTypes.bool,
  expensesError: PropTypes.string,

  //update budget
  budgetUpdating: PropTypes.bool,
  updateSuccessMessage: PropTypes.string,

  //add expenses
  expensesUploading: PropTypes.bool,
  expensesAddSuccessMessage: PropTypes.string,

  //delete expenses
  deleteExpenses: PropTypes.func,
  expensesDeleting: PropTypes.bool,
  expensesDeleteMessage: PropTypes.string,
  //update expenses
  updateExpenses: PropTypes.func,
  expensesUpdating: PropTypes.bool,
  expensesUpdateSuccessMessage: PropTypes.string,
};

const mapStateToProps = state => ({
  //fetch budget list
  budget: state.budget.getBudgetList.budget,
  loading: state.budget.getBudgetList.loading,
  error: state.budget.getBudgetList.error,

  //get budget expenses summary
  summary: state.budget.summary.summary,
  summaryLoading: state.budget.summary.summaryLoading,
  summaryError: state.budget.summary.summaryError,

  //get sorted expenses
  expensesList: state.budget.getExpensesList.expensesList,
  expensesListLoading: state.budget.getExpensesList.loading,
  expensesListError: state.budget.getExpensesList.error,

  //delete expenses
  expensesDeleting: state.budget.deleteExpenses.deleting,
  expensesDeleteMessage: state.budget.deleteExpenses.deleteMessage,

  //update budget
  budgetUpdating: state.budget.updateBudget.uploading,
  updateSuccessMessage: state.budget.updateBudget.successMessage,

  //add expenses
  expensesUploading: state.budget.addExpenses.uploading,
  expensesAddSuccessMessage: state.budget.addExpenses.successMessage,

  //update expenses
  expensesUpdating: state.budget.updateExpenses.uploading,
  expensesUpdateSuccessMessage: state.budget.updateExpenses.successMessage,

  //fetch expenses
  expenses: state.budget.getExpenses.expenses,
  expensesLoading: state.budget.getExpenses.loading,
  expensesError: state.budget.getExpenses.error,
});

const mapDispatchToProps = dispatch => ({
  fetchBudgetList: tripId => dispatch(fetchBudgetList(tripId)),
  fetchExpenseSummary: id => dispatch(fetchExpenseSummary(id)),
  fetchExpensesList: id => dispatch(fetchExpensesList(id)),
  deleteExpenses: (id, expenses) => dispatch(deleteExpenses(id, expenses)),
  updateBudget: (id, newBudget) => dispatch(updateBudget(id, newBudget)),
  fetchExpenses: (budgetId, expenseId) =>
    dispatch(fetchExpenses(budgetId, expenseId)),
  updateExpenses: (budgetId, expensesId, updatedExpense) =>
    dispatch(updateExpenses(budgetId, expensesId, updatedExpense)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Budget);
