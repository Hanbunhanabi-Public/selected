import React from 'react';
import PropTypes from 'prop-types';
import styles from '../../styles/Style';
import {fetchFlight} from '../../actions/Flight/fetchFlight';
import {deleteFlight} from '../../actions/Flight/deleteFlight';
import {connect} from 'react-redux';
import ConnectedAddFlightModal from './AddFlightModal';

import {
  ListItem,
  Text,
  Separator,
  View,
  Spinner,
  List,
  Button,
  Icon,
} from 'native-base';
import {handleParseDate} from '../../utils/globalVars';

export class Flight extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      updateFlightModalVisible: false,
      chosenFlight: undefined,
    };
  }

  componentDidMount() {
    this.props.fetchFlight(this.props.trip._id);
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.deleteFlightLoading !== this.props.deleteFlightLoading ||
      prevProps.updateFlightLoading !== this.props.updateFlightLoading ||
      prevProps.createFlightLoading !== this.props.createFlightLoading
    ) {
      this.props.fetchFlight(this.props.trip._id);
    }
  }

  setUpdateFlightModalVisible(visible) {
    this.setState({updateFlightModalVisible: visible});
  }

  handleDeleteFlight(filghtId) {
    this.props.deleteFlight(filghtId);
  }

  render() {
    return !this.props.loading ? (
      <View>
        {this.props.flight.length === 0 && (
          <Text>You don't have any flights.</Text>
        )}
        {this.props.flight.map(flight => (
          <List key={flight._id}>
            <ListItem itemDivider style={styles.listBanner}>
              <Text style={styles.listTitle}>{`${flight.number} - ${
                flight.airline
              }`}</Text>
              <View style={styles.listButtons}>
                <Button
                  small
                  transparent
                  primary
                  iconLeft
                  light
                  onPress={() => {
                    this.setState({
                      chosenFlight: flight,
                    });
                    this.setUpdateFlightModalVisible(true);
                  }}>
                  <Icon style={styles.listIcon} name="md-create" />
                </Button>
                <Button
                  small
                  transparent
                  light
                  onPress={() => {
                    this.handleDeleteFlight(flight._id);
                  }}>
                  <Icon style={styles.listIcon} name="md-remove-circle" />
                </Button>
              </View>
            </ListItem>
            {flight.status && (
              <ListItem style={styles.listItemHolder}>
                <Text style={styles.boldText}>Status</Text>
                <Text>{flight.status}</Text>
              </ListItem>
            )}
            {flight.date && (
              <ListItem style={styles.listItemHolder}>
                <Text style={styles.boldText}>Date</Text>
                <Text>{handleParseDate(flight.date, '-')}</Text>
              </ListItem>
            )}
            {flight.departure && (
              <List style={styles.listItemListHolder}>
                <Text style={styles.boldText}>Departure</Text>
                {flight.departure.airport.name && (
                  <ListItem style={styles.listItemListItemHolder}>
                    <Text>Airport</Text>
                    <Text>{`${flight.departure.airport.name}${
                      flight.departure.airport.iata
                        ? ' - ' + flight.departure.airport.iata
                        : ''
                    }`}</Text>
                  </ListItem>
                )}
                {flight.departure.airport.municipalityName && (
                  <ListItem style={styles.listItemListItemHolder}>
                    <Text>Location</Text>
                    <Text>
                      {`${flight.departure.airport.municipalityName} - ${
                        flight.departure.airport.countryCode
                      }`}
                    </Text>
                  </ListItem>
                )}
                {flight.departure.gate && (
                  <ListItem style={styles.listItemListItemHolder}>
                    <Text>Gate</Text>
                    <Text>{`${flight.departure.gate}`}</Text>
                  </ListItem>
                )}
                {flight.departure.scheduledTimeLocal && (
                  <ListItem style={styles.listItemListItemHolder}>
                    <Text>Scheduled Time</Text>
                    <Text>{`${flight.departure.scheduledTimeLocal}`}</Text>
                  </ListItem>
                )}
                {flight.departure.actualTimeLocal && (
                  <ListItem style={styles.listItemListItemHolder}>
                    <Text>Actual Time</Text>
                    <Text>{`${flight.departure.actualTimeLocal}`}</Text>
                  </ListItem>
                )}
              </List>
            )}
            {flight.arrival && (
              <List style={styles.listItemListHolder}>
                <Text style={styles.boldText}>Arrival</Text>
                {flight.arrival.airport.name && (
                  <ListItem style={styles.listItemListItemHolder}>
                    <Text>Airport</Text>
                    <Text>{`${flight.arrival.airport.name}${
                      flight.arrival.airport.iata
                        ? ' - ' + flight.arrival.airport.iata
                        : ''
                    }`}</Text>
                  </ListItem>
                )}
                {flight.arrival.airport.municipalityName && (
                  <ListItem style={styles.listItemListItemHolder}>
                    <Text>Location</Text>
                    <Text>
                      {`${flight.arrival.airport.municipalityName} - ${
                        flight.arrival.airport.countryCode
                      }`}
                    </Text>
                  </ListItem>
                )}
                {flight.arrival.gate && (
                  <ListItem style={styles.listItemListItemHolder}>
                    <Text>Gate</Text>
                    <Text>{`${flight.arrival.gate}`}</Text>
                  </ListItem>
                )}
                {flight.arrival.scheduledTimeLocal && (
                  <ListItem style={styles.listItemListItemHolder}>
                    <Text>Scheduled Time</Text>
                    <Text>{`${flight.arrival.scheduledTimeLocal}`}</Text>
                  </ListItem>
                )}

                {flight.arrival.actualTimeLocal && (
                  <ListItem style={styles.listItemListItemHolder}>
                    <Text>Actual Time</Text>
                    <Text>{`${flight.arrival.actualTimeLocal}`}</Text>
                  </ListItem>
                )}
              </List>
            )}
            <ConnectedAddFlightModal
              visible={this.state.updateFlightModalVisible}
              cancelFunc={() =>
                this.setUpdateFlightModalVisible(
                  !this.state.updateFlightModalVisible,
                )
              }
              flight={this.state.chosenFlight}
            />
            <Separator style={styles.separator} />
          </List>
        ))}
      </View>
    ) : (
      <Spinner />
    );
  }
}

Flight.propTypes = {
  trip: PropTypes.object,
  dispatch: PropTypes.func,
  flight: PropTypes.array,
  loading: PropTypes.bool,
  createFlightMessage: PropTypes.string,
  createFlightLoading: PropTypes.bool,
  createFlightError: PropTypes.string,
  deleteFlightMessage: PropTypes.string,
  deleteFlightLoading: PropTypes.bool,
  deleteFlightError: PropTypes.string,
  updateFlightMessage: PropTypes.string,
  updateFlightLoading: PropTypes.bool,
  updateFlightError: PropTypes.string,
};

const mapStateToProps = state => ({
  flight: state.flight.getFlight.flight,
  loading: state.flight.getFlight.loading,
  error: state.flight.getFlight.error,
  createFlightMessage: state.flight.createFlight.createSuccessMessage,
  createFlightLoading: state.flight.createFlight.createLoading,
  createFlightError: state.flight.createFlight.createError,
  deleteFlightMessage: state.flight.deleteFlight.deleteSuccessMessage,
  deleteFlightLoading: state.flight.deleteFlight.deleteLoading,
  deleteFlightError: state.flight.deleteFlight.deleteError,
  updateFlightMessage: state.flight.updateFlight.updateSuccessMessage,
  updateFlightLoading: state.flight.updateFlight.updateLoading,
  updateFlightError: state.flight.updateFlight.updateError,
});

const mapDispatchToProps = dispatch => ({
  fetchFlight: tripId => dispatch(fetchFlight(tripId)),
  deleteFlight: id => dispatch(deleteFlight(id)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Flight);
