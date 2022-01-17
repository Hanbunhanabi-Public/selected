import React from 'react';
import PropTypes from 'prop-types';
import styles from '../../styles/Style';
import {
  Button,
  Form,
  Item,
  Input,
  Label,
  Picker,
  Icon,
  DatePicker,
} from 'native-base';
import {View, Text, ScrollView} from 'react-native';
import Modal from 'react-native-modal';
import {createFlightManually} from '../../actions/Flight/createFlight';
import {createFlightAutomatically} from '../../actions/Flight/createFlight';
import {updateFlight} from '../../actions/Flight/updateFlight';

import {connect} from 'react-redux';

export class AddFlightModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addMode: 'Manual',
      departureCityChanged: false,
      departureCountryChanged: false,
      departureAirportChanged: false,
      departureGateChanged: false,
      departureTimeChanged: false,
      arrivalCityChanged: false,
      arrivalCountryChanged: false,
      arrivalAirportChanged: false,
      arrivalGateChanged: false,
      arrivalTimeChanged: false,
      flightNumberChanged: false,
      flightDateChanged: false,
      airlineChanged: false,
    };
  }

  handleCreateFlightManually(
    tripId,
    departureCity,
    departureCountry,
    departureAirport,
    departureGate,
    departureTime,
    arrivalCity,
    arrivalCountry,
    arrivalAirport,
    arrivalGate,
    arrivalTime,
    flightNumber,
    flightDate,
    airline,
  ) {
    this.props.createFlightManually(
      tripId,
      departureCity,
      departureCountry,
      departureAirport,
      departureGate,
      departureTime,
      arrivalCity,
      arrivalCountry,
      arrivalAirport,
      arrivalGate,
      arrivalTime,
      flightNumber,
      flightDate,
      airline,
    );
  }

  handleCreateFlightAutomatically(tripId, flightNumber, flightDate) {
    this.props.createFlightAutomatically(tripId, flightNumber, flightDate);
  }

  handleUpdateFlight(
    flightID,
    departureCity,
    departureCountry,
    departureAirport,
    departureGate,
    departureTime,
    arrivalCity,
    arrivalCountry,
    arrivalAirport,
    arrivalGate,
    arrivalTime,
    flightNumber,
    flightDate,
    airline,
  ) {
    this.props.updateFlight(
      flightID,
      departureCity,
      departureCountry,
      departureAirport,
      departureGate,
      departureTime,
      arrivalCity,
      arrivalCountry,
      arrivalAirport,
      arrivalGate,
      arrivalTime,
      flightNumber,
      flightDate,
      airline,
    );
  }

  render() {
    return (
      <Modal
        isVisible={this.props.visible}
        animationIn="slideInUp"
        animationOut="slideOutDown"
        style={styles.extraLargeModal}>
        <ScrollView>
          <View style={styles.modalView}>
            <Text style={styles.modalHeader}>
              {' '}
              {`${this.props.flight ? 'Update' : 'Add'}`} Flight
            </Text>
          </View>
          <Form>
            {!this.props.flight && (
              <Item inlineLabel picker style={styles.transportationTypePicker}>
                <Label>Add Mode</Label>
                <Picker
                  style={styles.picker}
                  itemStyle={styles.pickerItem}
                  mode="dropdown"
                  iosIcon={<Icon name="arrow-down" />}
                  onValueChange={value =>
                    this.setState({
                      addMode: value,
                    })
                  }
                  selectedValue={this.state.addMode}>
                  <Item label="Manual" value="Manual" />
                  <Item label="Auto" value="Auto" />
                </Picker>
              </Item>
            )}
            {this.state.addMode === 'Manual' && (
              <View>
                <View style={styles.parallelInputs}>
                  <Item stackedLabel>
                    <Label>Flight Number</Label>
                    <Input
                      defaultValue={
                        this.props.flight ? this.props.flight.number : ''
                      }
                      onChangeText={textEntry => {
                        this.setState({flightNumberChanged: true});
                        this.flightNumber = textEntry;
                      }}
                    />
                  </Item>
                  <Item stackedLabel>
                    <Label>Airline</Label>
                    <Input
                      defaultValue={
                        this.props.flight ? this.props.flight.airline : ''
                      }
                      onChangeText={textEntry => {
                        this.setState({airlineChanged: true});
                        this.airline = textEntry;
                      }}
                    />
                  </Item>
                </View>
                <Item DatePicker stackedLabel>
                  <Label>Flight Date</Label>
                  <DatePicker
                    defaultDate={
                      this.props.flight
                        ? new Date(this.props.flight.date)
                        : new Date()
                    }
                    animationType={'fade'}
                    onDateChange={newDate => {
                      this.setState({flightDateChanged: true});
                      this.flightDate = newDate;
                    }}
                  />
                </Item>

                <View style={styles.parallelInputs}>
                  <Item stackedLabel>
                    <Label>Departure City</Label>
                    <Input
                      defaultValue={
                        this.props.flight
                          ? this.props.flight.departure.airport.municipalityName
                          : ''
                      }
                      onChangeText={textEntry => {
                        this.setState({departureCityChanged: true});
                        this.departureCity = textEntry;
                      }}
                    />
                  </Item>
                  <Item stackedLabel>
                    <Label>Arrival City</Label>
                    <Input
                      defaultValue={
                        this.props.flight
                          ? this.props.flight.arrival.airport.municipalityName
                          : ''
                      }
                      onChangeText={textEntry => {
                        this.setState({arrivalCityChanged: true});
                        this.arrivalCity = textEntry;
                      }}
                    />
                  </Item>
                </View>
                <View style={styles.parallelInputs}>
                  <Item stackedLabel>
                    <Label>Departure Country</Label>
                    <Input
                      defaultValue={
                        this.props.flight
                          ? this.props.flight.departure.airport.countryCode
                          : ''
                      }
                      onChangeText={textEntry => {
                        this.setState({departureCountryChanged: true});
                        this.departureCountry = textEntry;
                      }}
                    />
                  </Item>
                  <Item stackedLabel>
                    <Label>Arrival Country</Label>
                    <Input
                      defaultValue={
                        this.props.flight
                          ? this.props.flight.arrival.airport.countryCode
                          : ''
                      }
                      onChangeText={textEntry => {
                        this.setState({arrivalCountryChanged: true});
                        this.arrivalCountry = textEntry;
                      }}
                    />
                  </Item>
                </View>
                <View style={styles.parallelInputs}>
                  <Item stackedLabel>
                    <Label>Departure Airport</Label>
                    <Input
                      defaultValue={
                        this.props.flight
                          ? this.props.flight.departure.airport.name
                          : ''
                      }
                      onChangeText={textEntry => {
                        this.setState({departureAirportChanged: true});
                        this.departureAirport = textEntry;
                      }}
                    />
                  </Item>
                  <Item stackedLabel>
                    <Label>Arrival Airport</Label>
                    <Input
                      defaultValue={
                        this.props.flight
                          ? this.props.flight.arrival.airport.name
                          : ''
                      }
                      onChangeText={textEntry => {
                        this.setState({arrivalAirportChanged: true});
                        this.arrivalAirport = textEntry;
                      }}
                    />
                  </Item>
                </View>
                <View style={styles.parallelInputs}>
                  <Item stackedLabel>
                    <Label>Departure Gate</Label>
                    <Input
                      defaultValue={
                        this.props.flight
                          ? this.props.flight.departure.gate
                          : ''
                      }
                      onChangeText={textEntry => {
                        this.setState({departureGateChanged: true});
                        this.departureGate = textEntry;
                      }}
                    />
                  </Item>
                  <Item stackedLabel>
                    <Label>Arrival Gate</Label>
                    <Input
                      defaultValue={
                        this.props.flight ? this.props.flight.arrival.gate : ''
                      }
                      onChangeText={textEntry => {
                        this.setState({arrivalGateChanged: true});
                        this.arrivalGate = textEntry;
                      }}
                    />
                  </Item>
                </View>
                <View style={styles.parallelInputs}>
                  <Item DatePicker stackedLabel>
                    <Label>Departure Date</Label>
                    <DatePicker
                      defaultDate={
                        this.props.flight
                          ? new Date(
                              this.props.flight.departure.scheduledTimeLocal,
                            )
                          : new Date()
                      }
                      animationType={'fade'}
                      onDateChange={newDate => {
                        this.setState({departureTimeChanged: true});
                        this.departureTime = newDate;
                      }}
                    />
                  </Item>
                  <Item DatePicker stackedLabel>
                    <Label>Arrival Date</Label>
                    <DatePicker
                      defaultDate={
                        this.props.flight
                          ? new Date(
                              this.props.flight.arrival.scheduledTimeLocal,
                            )
                          : new Date()
                      }
                      animationType={'fade'}
                      onDateChange={newDate => {
                        this.setState({arrivalTimeChanged: true});
                        this.arrivalTime = newDate;
                      }}
                    />
                  </Item>
                </View>
              </View>
            )}
            {this.state.addMode === 'Auto' && (
              <View>
                <Item stackedLabel>
                  <Label>Flight Number</Label>
                  <Input
                    defaultValue={
                      this.props.flight ? this.props.flight.number : ''
                    }
                    onChangeText={textEntry => {
                      this.setState({flightNumberChanged: true});
                      this.flightNumber = textEntry;
                    }}
                  />
                </Item>
                <Item DatePicker stackedLabel>
                  <Label>Flight Date</Label>
                  <DatePicker
                    defaultDate={
                      this.props.flight
                        ? new Date(this.props.flight.date)
                        : new Date()
                    }
                    animationType={'fade'}
                    onDateChange={newDate => {
                      this.setState({flightDateChanged: true});
                      this.flightDate = newDate;
                    }}
                  />
                </Item>
              </View>
            )}
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
                this.props.flight &&
                  this.handleUpdateFlight(
                    this.props.flight._id,
                    this.state.departureCityChanged
                      ? this.departureCity
                      : this.props.flight.departure.airport.municipalityName,
                    this.state.departureCountryChanged
                      ? this.departureCountry
                      : this.props.flight.departure.airport.countryCode,
                    this.state.departureAirportChanged
                      ? this.departureAirport
                      : this.props.flight.departure.airport.name,
                    this.state.departureGateChanged
                      ? this.departureGate
                      : this.props.flight.departure.gate,
                    this.state.departureTimeChanged
                      ? this.departureTime
                      : this.props.flight.departure.scheduledTimeLocal,
                    this.state.arrivalCityChanged
                      ? this.arrivalCity
                      : this.props.flight.arrival.airport.municipalityName,
                    this.state.arrivalCountryChanged
                      ? this.arrivalCountry
                      : this.props.flight.arrival.airport.countryCode,
                    this.state.arrivalAirportChanged
                      ? this.arrivalAirport
                      : this.props.flight.arrival.airport.name,
                    this.state.arrivalGateChanged
                      ? this.arrivalGate
                      : this.props.flight.arrival.gate,
                    this.state.arrivalTimeChanged
                      ? this.arrivalTime
                      : this.props.flight.arrival.scheduledTimeLocal,
                    this.state.flightNumberChanged
                      ? this.flightNumber
                      : this.props.flight.number,
                    this.state.flightDateChanged
                      ? this.flightDate
                      : this.props.flight.date,
                    this.state.airlineChanged
                      ? this.airline
                      : this.props.flight.airline,
                  );
                !this.props.flight &&
                  this.state.addMode === 'Manual' &&
                  this.handleCreateFlightManually(
                    this.props.trip._id,
                    this.departureCity,
                    this.departureCountry,
                    this.departureAirport,
                    this.departureGate,
                    this.state.departureTimeChanged
                      ? this.departureTime
                      : new Date(),
                    this.arrivalCity,
                    this.arrivalCountry,
                    this.arrivalAirport,
                    this.arrivalGate,
                    this.state.arrivalTimeChanged
                      ? this.arrivalTime
                      : new Date(),
                    this.flightNumber,
                    this.state.flightDateChanged ? this.flightDate : new Date(),
                    this.airline,
                  );
                !this.props.flight &&
                  this.state.addMode === 'Auto' &&
                  this.handleCreateFlightAutomatically(
                    this.props.trip._id,
                    this.flightNumber,
                    this.state.flightDateChanged ? this.flightDate : new Date(),
                  );
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

AddFlightModal.propTypes = {
  visible: PropTypes.bool,
  cancelFunc: PropTypes.func,
  flight: PropTypes.object,
  trip: PropTypes.object,
};

const mapDispatchToProps = dispatch => ({
  createFlightManually: (
    tripId,
    departureCity,
    departureCountry,
    departureAirport,
    departureGate,
    departureTime,
    arrivalCity,
    arrivalCountry,
    arrivalAirport,
    arrivalGate,
    arrivalTime,
    flightNumber,
    flightDate,
    airline,
  ) =>
    dispatch(
      createFlightManually(
        tripId,
        departureCity,
        departureCountry,
        departureAirport,
        departureGate,
        departureTime,
        arrivalCity,
        arrivalCountry,
        arrivalAirport,
        arrivalGate,
        arrivalTime,
        flightNumber,
        flightDate,
        airline,
      ),
    ),
  createFlightAutomatically: (tripId, flightNumber, flightDate) =>
    dispatch(createFlightAutomatically(tripId, flightNumber, flightDate)),
  updateFlight: (
    flightID,
    departureCity,
    departureCountry,
    departureAirport,
    departureGate,
    departureTime,
    arrivalCity,
    arrivalCountry,
    arrivalAirport,
    arrivalGate,
    arrivalTime,
    flightNumber,
    flightDate,
    airline,
  ) =>
    dispatch(
      updateFlight(
        flightID,
        departureCity,
        departureCountry,
        departureAirport,
        departureGate,
        departureTime,
        arrivalCity,
        arrivalCountry,
        arrivalAirport,
        arrivalGate,
        arrivalTime,
        flightNumber,
        flightDate,
        airline,
      ),
    ),
});

export default connect(
  null,
  mapDispatchToProps,
)(AddFlightModal);
