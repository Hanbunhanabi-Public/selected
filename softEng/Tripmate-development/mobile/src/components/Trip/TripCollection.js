import React, {Component} from 'react';
import PropTypes from 'prop-types';
import styles from '../../styles/Style';
import {View, Text} from 'react-native';
import {Button, Icon, Card, CardItem, Body, Left, Right} from 'native-base';
import ConnectedAddTripModal from '../../components/Trip/AddTripModal';
import {fetchTrips} from '../../actions/Trip/fetchTrips';
import {connect} from 'react-redux';
import {handleParseDate} from '../../utils/globalVars';
import ConnectedTripDetail from './TripDetail';

export class TripCollection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addTripModalVisible: false,
      displayTripDetail: false,
      chosenTrip: null,
    };
  }

  setAddTripModalVisible(visible) {
    this.setState({addTripModalVisible: visible});
  }

  setDisplayTripDetail(visible) {
    this.setState({displayTripDetail: visible});
  }

  setChosenTrip(trip) {
    this.setState({chosenTrip: trip});
  }

  componentDidMount() {
    this.props.fetchTrips(this.props.user._id);
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.deleteTripLoading !== this.props.deleteTripLoading ||
      prevProps.updateTripLoading !== this.props.updateTripLoading ||
      prevProps.createTripLoading !== this.props.createTripLoading
    ) {
      this.props.fetchTrips(this.props.user._id);
    }
  }

  render() {
    return this.state.displayTripDetail && this.state.chosenTrip ? (
      <ConnectedTripDetail
        trip={this.state.chosenTrip}
        handleTripDetail={() =>
          this.setDisplayTripDetail(!this.state.displayTripDetail)
        }
      />
    ) : (
      <View>
        <View style={styles.homeHeader}>
          <Text style={styles.pageHeader}>Your Trips</Text>
          <Button small onPress={this.props.logout}>
            <Text style={styles.buttonWithWhiteText}>
              {'    '}LOG OUT{'    '}
            </Text>
          </Button>
          <Button
            small
            iconLeft
            onPress={() => {
              this.setAddTripModalVisible(true);
            }}>
            <Icon name="ios-add" />
            <Text style={styles.buttonWithWhiteText}>
              {'    '}CREATE TRIP{'    '}
            </Text>
          </Button>
        </View>
        {(this.props.trips.length === 0 || !this.props.trips[0]) && (
          <View>
            <Text style={styles.tripCardHeader}>You don't have any trips.</Text>
          </View>
        )}
        {this.props.trips.length > 0 &&
          this.props.trips.map(trip => (
            <View key={trip._id}>
              <Card>
                <CardItem header bordered>
                  <View>
                    <Text style={styles.tripCardHeader}>{trip.tripname}</Text>
                    <Text>
                      {`${handleParseDate(
                        trip.startDate,
                        '/',
                      )} - ${handleParseDate(trip.endDate, '/')}`}
                    </Text>
                  </View>
                </CardItem>
                <CardItem>
                  <Body>
                    <Text>{trip.description}</Text>
                  </Body>
                </CardItem>
                <CardItem
                  footer
                  button
                  onPress={() => {
                    this.setDisplayTripDetail(true);
                    this.setChosenTrip(trip);
                  }}>
                  <Left />
                  <Body>
                    <Text style={styles.tripCardButton}>VIEW TRIP</Text>
                  </Body>
                  <Right />
                </CardItem>
              </Card>
            </View>
          ))}
        <ConnectedAddTripModal
          userId={this.props.user._id}
          visible={this.state.addTripModalVisible}
          cancelFunc={() =>
            this.setAddTripModalVisible(!this.state.addTripModalVisible)
          }
        />
      </View>
    );
  }
}

TripCollection.propTypes = {
  user: PropTypes.object,
  dispatch: PropTypes.func,
  logout: PropTypes.func,
  trips: PropTypes.array,
  loading: PropTypes.bool,
  createTripMessage: PropTypes.string,
  createTripLoading: PropTypes.bool,
  createTripError: PropTypes.string,
  deleteTripMessage: PropTypes.string,
  deleteTripLoading: PropTypes.bool,
  deleteTripError: PropTypes.string,
  updateTripMessage: PropTypes.string,
  updateTripLoading: PropTypes.bool,
  updateTripError: PropTypes.string,
};

const mapStateToProps = state => ({
  trips: state.trip.getTrips.trips,
  loading: state.trip.getTrips.loading,
  error: state.trip.getTrips.error,
  createTripMessage: state.trip.createTrip.successMessage,
  createTripLoading: state.trip.createTrip.uploading,
  createTripError: state.trip.createTrip.error,
  deleteTripMessage: state.trip.deleteTrip.deleteMessage,
  deleteTripLoading: state.trip.deleteTrip.deleting,
  deleteTripError: state.trip.deleteTrip.error,
  updateTripMessage: state.trip.updateTrip.successMessage,
  updateTripLoading: state.trip.updateTrip.uploading,
  updateTripError: state.trip.updateTrip.error,
});

const mapDispatchToProps = dispatch => ({
  fetchTrips: userId => dispatch(fetchTrips(userId)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TripCollection);
