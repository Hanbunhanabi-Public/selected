import React from 'react';
import styles from '../../styles/Style';
import PropTypes from 'prop-types';
import {Button, Form, Item, Input, Label, DatePicker} from 'native-base';
import {View, Text, ScrollView} from 'react-native';
import Modal from 'react-native-modal';
import {createEvent} from '../../actions/Event/createEvent';
import {updateEvent} from '../../actions/Event/updateEvent';
import {connect} from 'react-redux';

export class AddEventModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      titleChanged: false,
      descriptionChanged: false,
      startDateChanged: false,
      endDateChanged: false,
      locationChanged: false,
      costChanged: false,
    };
  }

  handleCreateEvent(
    tripId,
    eventTitle,
    description,
    startDate,
    endDate,
    location,
    cost,
  ) {
    this.props.createEvent(
      tripId,
      eventTitle,
      description,
      startDate,
      endDate,
      location,
      cost,
    );
  }

  handleUpdateEvent(
    eventID,
    eventTitle,
    description,
    startDate,
    endDate,
    location,
    cost,
  ) {
    this.props.updateEvent(
      eventID,
      eventTitle,
      description,
      startDate,
      endDate,
      location,
      cost,
    );
  }

  render() {
    return (
      <Modal
        isVisible={this.props.visible}
        animationIn="slideInUp"
        animationOut="slideOutDown"
        style={styles.largeModal}>
        <ScrollView>
          <View style={styles.modalView}>
            <Text style={styles.modalHeader}>
              {`${this.props.event ? 'Update' : 'Add'}`} Event
            </Text>
          </View>
          <Form>
            <Item stackedLabel>
              <Label>Title</Label>
              <Input
                defaultValue={this.props.event ? this.props.event.title : ''}
                onChangeText={textEntry => {
                  this.setState({titleChanged: true});
                  this.eventTitle = textEntry;
                }}
              />
            </Item>
            <Item stackedLabel>
              <Label>Description</Label>
              <Input
                defaultValue={
                  this.props.event ? this.props.event.description : ''
                }
                onChangeText={textEntry => {
                  this.setState({descriptionChanged: true});
                  this.description = textEntry;
                }}
              />
            </Item>
            <View style={styles.parallelInputs}>
              <Item DatePicker stackedLabel>
                <Label>Start Date</Label>
                <DatePicker
                  defaultDate={
                    this.props.event
                      ? new Date(this.props.event.start)
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
                    this.props.event
                      ? new Date(this.props.event.end)
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
              <Label>Location</Label>
              <Input
                defaultValue={this.props.event ? this.props.event.location : ''}
                onChangeText={textEntry => {
                  this.setState({locationChanged: true});
                  this.location = textEntry;
                }}
              />
            </Item>
            <Item stackedLabel>
              <Label>Cost</Label>
              <Input
                defaultValue={
                  this.props.event ? '' + this.props.event.cost : ''
                }
                onChangeText={textEntry => {
                  this.setState({costChanged: true});
                  this.cost = textEntry;
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
                this.props.event &&
                  this.handleUpdateEvent(
                    this.props.event._id,
                    this.state.titleChanged
                      ? this.eventTitle
                      : this.props.event.title,
                    this.state.descriptionChanged
                      ? this.description
                      : this.props.event.description,
                    this.state.startDateChanged
                      ? this.startDate
                      : this.props.event.start,
                    this.state.endDateChanged
                      ? this.endDate
                      : this.props.event.end,
                    this.state.locationChanged
                      ? this.location
                      : this.props.event.location,
                    this.state.costChanged ? this.cost : this.props.event.cost,
                  );
                !this.props.event &&
                  this.handleCreateEvent(
                    this.props.trip._id,
                    this.eventTitle,
                    this.description,
                    this.state.startDateChanged ? this.startDate : new Date(),
                    this.state.endDateChanged ? this.endDate : new Date(),
                    this.location,
                    this.cost,
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

AddEventModal.propTypes = {
  visible: PropTypes.bool,
  cancelFunc: PropTypes.func,
  event: PropTypes.object,
  trip: PropTypes.object,
};

const mapDispatchToProps = dispatch => ({
  createEvent: (
    tripId,
    eventTitle,
    description,
    startDate,
    endDate,
    location,
    cost,
  ) =>
    dispatch(
      createEvent(
        tripId,
        eventTitle,
        description,
        startDate,
        endDate,
        location,
        cost,
      ),
    ),
  updateEvent: (
    eventID,
    eventTitle,
    description,
    startDate,
    endDate,
    location,
    cost,
  ) =>
    dispatch(
      updateEvent(
        eventID,
        eventTitle,
        description,
        startDate,
        endDate,
        location,
        cost,
      ),
    ),
});

export default connect(
  null,
  mapDispatchToProps,
)(AddEventModal);
