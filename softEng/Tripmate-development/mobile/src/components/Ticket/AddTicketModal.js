import React from 'react';
import styles from '../../styles/Style';
import PropTypes from 'prop-types';
import {
  Button,
  Form,
  Item,
  Input,
  Label,
  DatePicker,
  Picker,
  Icon,
} from 'native-base';
import {View, Text, ScrollView} from 'react-native';
import Modal from 'react-native-modal';
import {createTicket} from '../../actions/Ticket/createTicket';
import {updateTicket} from '../../actions/Ticket/updateTicket';
import {connect} from 'react-redux';

export class AddTicketModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      transportType: props.ticket ? props.ticket.transportType : 'Rail',
      startLocationChanged: false,
      startDateChanged: false,
      endLocationChanged: false,
      endDateChanged: false,
      confirmationNumberChanged: false,
      notesChanged: false,
    };
  }

  handleCreateTciket(
    tripId,
    transportType,
    startLocation,
    startDate,
    endLocation,
    endDate,
    confirmationNumber,
    notes,
  ) {
    this.props.createTicket(
      tripId,
      transportType,
      startLocation,
      startDate,
      endLocation,
      endDate,
      confirmationNumber,
      notes,
    );
  }

  handleUpdateTicket(
    ticketID,
    transportType,
    startLocation,
    startDate,
    endLocation,
    endDate,
    confirmationNumber,
    notes,
  ) {
    this.props.updateTicket(
      ticketID,
      transportType,
      startLocation,
      startDate,
      endLocation,
      endDate,
      confirmationNumber,
      notes,
    );
  }

  render() {
    return (
      <Modal
        isVisible={this.props.visible}
        animationIn="slideInUp"
        animationOut="slideOutDown"
        style={styles.extraMediumModal}>
        <ScrollView>
          <View style={styles.modalView}>
            <Text style={styles.modalHeader}>
              {`${this.props.ticket ? 'Update' : 'Add'}`} Ticket
            </Text>
          </View>
          <Form>
            <Item inlineLabel picker style={styles.transportationTypePicker}>
              <Label>Transport Type</Label>
              <Picker
                style={styles.picker}
                itemStyle={styles.pickerItem}
                mode="dropdown"
                iosIcon={<Icon name="arrow-down" />}
                onValueChange={value =>
                  this.setState({
                    transportType: value,
                  })
                }
                selectedValue={this.state.transportType}>
                <Item label="Rail" value="Rail" />
                <Item label="Bus" value="Bus" />
                <Item label="Car Rental" value="Car Rental" />
                <Item label="Cruise" value="Cruise" />
                <Item label="Ferry" value="Ferry" />
              </Picker>
            </Item>
            <View style={styles.parallelInputs}>
              <Item stackedLabel>
                <Label>Departure</Label>
                <Input
                  defaultValue={
                    this.props.ticket ? this.props.ticket.start.location : ''
                  }
                  onChangeText={textEntry => {
                    this.setState({startLocationChanged: true});
                    this.startLocation = textEntry;
                  }}
                />
              </Item>
              <Item stackedLabel>
                <Label>Destination</Label>
                <Input
                  defaultValue={
                    this.props.ticket ? this.props.ticket.end.location : ''
                  }
                  onChangeText={textEntry => {
                    this.setState({endLocationChanged: true});
                    this.endLocation = textEntry;
                  }}
                />
              </Item>
            </View>
            <View style={styles.parallelInputs}>
              <Item DatePicker stackedLabel>
                <Label>Start Date</Label>
                <DatePicker
                  defaultDate={
                    this.props.ticket
                      ? new Date(this.props.ticket.start.date)
                      : new Date()
                  }
                  animationType={'fade'}
                  onDateChange={newDate => {
                    this.setState({startDateChanged: true});
                    this.startDate = newDate;
                  }}
                />
              </Item>
              <Item DatePicker stackedLabel>
                <Label>End Date</Label>
                <DatePicker
                  defaultDate={
                    this.props.ticket
                      ? new Date(this.props.ticket.end.date)
                      : new Date()
                  }
                  animationType={'fade'}
                  onDateChange={newDate => {
                    this.setState({endDateChanged: true});
                    this.endDate = newDate;
                  }}
                />
              </Item>
            </View>
            <Item stackedLabel>
              <Label>Confirmation Number</Label>
              <Input
                defaultValue={
                  this.props.ticket ? this.props.ticket.confirmationNumber : ''
                }
                onChangeText={textEntry => {
                  this.setState({confirmationNumberChanged: true});
                  this.confirmationNumber = textEntry;
                }}
              />
            </Item>
            <Item stackedLabel>
              <Label>Notes</Label>
              <Input
                defaultValue={this.props.ticket ? this.props.ticket.notes : ''}
                onChangeText={textEntry => {
                  this.setState({notesChanged: true});
                  this.notes = textEntry;
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
                this.props.ticket &&
                  this.handleUpdateTicket(
                    this.props.ticket._id,
                    this.state.transportType
                      ? this.state.transportType
                      : this.props.ticket.transportType,
                    this.state.startLocationChanged
                      ? this.startLocation
                      : this.props.ticket.start.location,
                    this.state.startDateChanged
                      ? this.startDate
                      : this.props.ticket.start.date,
                    this.state.endLocationChanged
                      ? this.endLocation
                      : this.props.ticket.end.location,
                    this.state.endDateChanged
                      ? this.endDate
                      : this.props.ticket.end.date,
                    this.state.confirmationNumberChanged
                      ? this.confirmationNumber
                      : this.props.ticket.confirmationNumber,
                    this.state.notesChanged
                      ? this.notes
                      : this.props.ticket.notes,
                  );
                !this.props.ticket &&
                  this.handleCreateTciket(
                    this.props.trip._id,
                    this.state.transportType,
                    this.startLocation,
                    this.state.startDateChanged ? this.startDate : new Date(),
                    this.endLocation,
                    this.state.endDateChanged ? this.endDate : new Date(),
                    this.confirmationNumber,
                    this.notes,
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

AddTicketModal.propTypes = {
  visible: PropTypes.bool,
  cancelFunc: PropTypes.func,
  ticket: PropTypes.object,
  trip: PropTypes.object,
};

const mapDispatchToProps = dispatch => ({
  createTicket: (
    tripId,
    transportType,
    startLocation,
    startDate,
    endLocation,
    endDate,
    confirmationNumber,
    notes,
  ) =>
    dispatch(
      createTicket(
        tripId,
        transportType,
        startLocation,
        startDate,
        endLocation,
        endDate,
        confirmationNumber,
        notes,
      ),
    ),
  updateTicket: (
    ticketID,
    transportType,
    startLocation,
    startDate,
    endLocation,
    endDate,
    confirmationNumber,
    notes,
  ) =>
    dispatch(
      updateTicket(
        ticketID,
        transportType,
        startLocation,
        startDate,
        endLocation,
        endDate,
        confirmationNumber,
        notes,
      ),
    ),
});

export default connect(
  null,
  mapDispatchToProps,
)(AddTicketModal);
