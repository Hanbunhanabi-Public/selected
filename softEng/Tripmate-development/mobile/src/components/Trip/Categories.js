import React, {Component} from 'react';
import PropTypes from 'prop-types';
import styles from '../../styles/Style';
import {View, Text} from 'react-native';
import {Button, Icon, Card, CardItem, Body, Left, Right} from 'native-base';
import ConnectedBudget from '../Budget/Budget';
import ConnectedToDoList from '../Todo/ToDoList';
import ConnectedFlight from '../Flight/Flight';
import ConnectedTicket from '../Ticket/Ticket';
import ConnectedHotel from '../Hotel/Hotel';
import ConnectedEvent from '../Event/Event';

export default class Categories extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showTodo: false,
      showBudget: true,
      showTicket: false,
      showFlight: false,
      showHotel: false,
      showEvent: false,
    };
  }

  render() {
    return (
      <View>
        <Card>
          <CardItem bordered style={styles.categoryBanner}>
            <Left>
              <Text style={styles.categoryTitle}>Budget</Text>
            </Left>
            <Body />
            <Right>
              <Button
                small
                transparent
                onPress={() =>
                  this.setState({showBudget: !this.state.showBudget})
                }>
                <Icon
                  style={styles.categoryIcon}
                  name={`arrow-${this.state.showBudget ? 'up' : 'down'}`}
                />
              </Button>
            </Right>
          </CardItem>
          {this.state.showBudget && <ConnectedBudget trip={this.props.trip} />}
        </Card>
        <Card>
          <CardItem bordered style={styles.categoryBanner}>
            <Left>
              <Text style={styles.categoryTitle}>Flights</Text>
            </Left>
            <Body />
            <Right>
              <Button
                small
                transparent
                onPress={() =>
                  this.setState({showFlight: !this.state.showFlight})
                }>
                <Icon
                  style={styles.categoryIcon}
                  name={`arrow-${this.state.showFlight ? 'up' : 'down'}`}
                />
              </Button>
            </Right>
          </CardItem>
          {this.state.showFlight && <ConnectedFlight trip={this.props.trip} />}
        </Card>
        <Card>
          <CardItem bordered style={styles.categoryBanner}>
            <Left>
              <Text style={styles.categoryTitle}>Tickets</Text>
            </Left>
            <Body />
            <Right>
              <Button
                small
                transparent
                onPress={() =>
                  this.setState({showTicket: !this.state.showTicket})
                }>
                <Icon
                  style={styles.categoryIcon}
                  name={`arrow-${this.state.showTicket ? 'up' : 'down'}`}
                />
              </Button>
            </Right>
          </CardItem>
          {this.state.showTicket && <ConnectedTicket trip={this.props.trip} />}
        </Card>
        <Card>
          <CardItem bordered style={styles.categoryBanner}>
            <Left>
              <Text style={styles.categoryTitle}>Hotels</Text>
            </Left>
            <Body />
            <Right>
              <Button
                small
                transparent
                onPress={() =>
                  this.setState({showHotel: !this.state.showHotel})
                }>
                <Icon
                  style={styles.categoryIcon}
                  name={`arrow-${this.state.showHotel ? 'up' : 'down'}`}
                />
              </Button>
            </Right>
          </CardItem>
          {this.state.showHotel && <ConnectedHotel trip={this.props.trip} />}
        </Card>
        <Card>
          <CardItem bordered style={styles.categoryBanner}>
            <Left>
              <Text style={styles.categoryTitle}>Events</Text>
            </Left>
            <Body />
            <Right>
              <Button
                small
                transparent
                onPress={() =>
                  this.setState({showEvent: !this.state.showEvent})
                }>
                <Icon
                  style={styles.categoryIcon}
                  name={`arrow-${this.state.showEvent ? 'up' : 'down'}`}
                />
              </Button>
            </Right>
          </CardItem>
          {this.state.showEvent && <ConnectedEvent trip={this.props.trip} />}
        </Card>
        <Card>
          <CardItem bordered style={styles.categoryBanner}>
            <Left>
              <Text style={styles.categoryTitle}>Todos</Text>
            </Left>
            <Body />
            <Right>
              <Button
                small
                transparent
                onPress={() => this.setState({showTodo: !this.state.showTodo})}>
                <Icon
                  style={styles.categoryIcon}
                  name={`arrow-${this.state.showTodo ? 'up' : 'down'}`}
                />
              </Button>
            </Right>
          </CardItem>
          {this.state.showTodo && <ConnectedToDoList trip={this.props.trip} />}
        </Card>
      </View>
    );
  }
}

Categories.propTypes = {
  trip: PropTypes.object,
};
