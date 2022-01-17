import React, {Component} from 'react';
import PropTypes from 'prop-types';
import styles from '../../styles/Style';
import {View} from 'react-native';
import {Icon} from 'native-base';
import Menu, {MenuItem} from 'react-native-material-menu';
import ConnectedAddFlightModal from '../Flight/AddFlightModal';
import ConnectedAddTicketModal from '../Ticket/AddTicketModal';
import ConnectedAddHotelModal from '../Hotel/AddHotelModal';
import ConnectedAddEventModal from '../Event/AddEventModal';
import ConnectedAddTodoListModal from '../Todo/AddTodoListModal';
import ConnectedAddExpenseModal from '../Budget/AddExpenseModal';
export default class MultipleAddButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addExpenseModalVisible: false,

      addFlightModalVisible: false,
      addTicketModalVisible: false,
      addHotelModalVisible: false,
      addEventModalVisible: false,
      addTodolistModalVisible: false,
    };
  }
  setAddExpenseModalVisible(visible) {
    this.hideMenu();
    this.setState({addExpenseModalVisible: visible});
  }
  setAddFlightModalVisible(visible) {
    this.hideMenu();
    this.setState({addFlightModalVisible: visible});
  }

  setAddTicketModalVisible(visible) {
    this.hideMenu();
    this.setState({addTicketModalVisible: visible});
  }

  setAddHotelModalVisible(visible) {
    this.hideMenu();
    this.setState({addHotelModalVisible: visible});
  }

  setAddEventModalVisible(visible) {
    this.hideMenu();
    this.setState({addEventModalVisible: visible});
  }

  setAddTodolistModalVisible(visible) {
    this.hideMenu();
    this.setState({addTodolistModalVisible: visible});
  }

  setDeleteModalVisible(visible) {
    this.setState({deleteModalVisible: visible});
  }

  changeDisplayAs(selected) {
    this.setState({
      displayAs: selected,
    });
  }

  _menu = null;

  setMenuRef = ref => {
    this._menu = ref;
  };

  hideMenu = () => {
    this._menu.hide();
  };

  showMenu = () => {
    this._menu.show();
  };

  render() {
    return (
      <View>
        <Menu
          ref={this.setMenuRef}
          button={
            <Icon
              name="ios-add"
              style={styles.multipleAddButton}
              onPress={this.showMenu}
            />
          }>
          <MenuItem
            onPress={() => {
              this.setAddExpenseModalVisible(true);
            }}>
            Expense
          </MenuItem>
          <MenuItem
            onPress={() => {
              this.setAddFlightModalVisible(true);
            }}>
            Flight
          </MenuItem>
          <MenuItem
            onPress={() => {
              this.setAddTicketModalVisible(true);
            }}>
            Ticket
          </MenuItem>
          <MenuItem
            onPress={() => {
              this.setAddHotelModalVisible(true);
            }}>
            Hotel
          </MenuItem>
          <MenuItem
            onPress={() => {
              this.setAddEventModalVisible(true);
            }}>
            Event
          </MenuItem>
          <MenuItem
            onPress={() => {
              this.setAddTodolistModalVisible(true);
            }}>
            Todo List
          </MenuItem>
        </Menu>
        <ConnectedAddExpenseModal
          visible={this.state.addExpenseModalVisible}
          cancelFunc={() =>
            this.setAddExpenseModalVisible(!this.state.addExpenseModalVisible)
          }
          trip={this.props.trip}
        />
        <ConnectedAddFlightModal
          visible={this.state.addFlightModalVisible}
          cancelFunc={() =>
            this.setAddFlightModalVisible(!this.state.addFlightModalVisible)
          }
          trip={this.props.trip}
        />
        <ConnectedAddTicketModal
          visible={this.state.addTicketModalVisible}
          cancelFunc={() =>
            this.setAddTicketModalVisible(!this.state.addTicketModalVisible)
          }
          trip={this.props.trip}
        />
        <ConnectedAddHotelModal
          visible={this.state.addHotelModalVisible}
          cancelFunc={() =>
            this.setAddHotelModalVisible(!this.state.addHotelModalVisible)
          }
          trip={this.props.trip}
        />
        <ConnectedAddEventModal
          visible={this.state.addEventModalVisible}
          cancelFunc={() =>
            this.setAddEventModalVisible(!this.state.addEventModalVisible)
          }
          trip={this.props.trip}
        />
        <ConnectedAddTodoListModal
          visible={this.state.addTodolistModalVisible}
          cancelFunc={() =>
            this.setAddTodolistModalVisible(!this.state.addTodolistModalVisible)
          }
          trip={this.props.trip}
        />
      </View>
    );
  }
}

MultipleAddButton.propTypes = {
  trip: PropTypes.object,
};
