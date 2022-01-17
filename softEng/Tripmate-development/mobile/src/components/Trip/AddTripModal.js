import React from 'react';
import PropTypes from 'prop-types';
import styles from '../../styles/Style';
import {Button, Form, Item, Input, Label, DatePicker} from 'native-base';
import {View, Text, ScrollView} from 'react-native';
import Modal from 'react-native-modal';
import {createTrip} from '../../actions/Trip/createTrip';
import {updateTrip} from '../../actions/Trip/updateTrip';
import {connect} from 'react-redux';

export class AddTripModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tripnameChanged: false,
      descriptionChanged: false,
      startDateChanged: false,
      endDateChanged: false,
    };
  }

  handleCreateTrip(userId, tripname, description, startDate, endDate, budget) {
    this.props.createTrip(
      userId,
      tripname,
      description,
      startDate,
      endDate,
      budget,
    );
  }

  handleUpdateTrip(tripId, tripname, description, startDate, endDate) {
    this.props.updateTrip(tripId, tripname, description, startDate, endDate);
  }

  render() {
    return (
      <View>
        <Modal
          isVisible={this.props.visible}
          animationIn="slideInUp"
          animationOut="slideOutDown"
          style={styles.mediumModal}>
          <ScrollView>
            <View style={styles.modalView}>
              <Text style={styles.modalHeader}>
                {`${this.props.trip ? 'Update' : 'Add'}`} Trip
              </Text>
            </View>
            <Form>
              <Item stackedLabel>
                <Label>Name</Label>
                <Input
                  defaultValue={this.props.trip ? this.props.trip.tripname : ''}
                  onChangeText={textEntry => {
                    this.setState({tripnameChanged: true});
                    this.tripname = textEntry;
                  }}
                />
              </Item>
              <Item stackedLabel>
                <Label>Description</Label>
                <Input
                  defaultValue={
                    this.props.trip ? this.props.trip.description : ''
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
                      this.props.hotel
                        ? new Date(this.props.trip.startDate)
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
                      this.props.hotel
                        ? new Date(this.props.trip.endDate)
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
              {!this.props.trip && (
                <Item stackedLabel>
                  <Label>Budget</Label>
                  <Input
                    onChangeText={textEntry => {
                      this.budget = textEntry;
                    }}
                  />
                </Item>
              )}
            </Form>
            <View style={styles.modalButtonView}>
              <Button small transparent onPress={this.props.cancelFunc}>
                <Text style={styles.addModalCancelButton}>
                  {'  '}CANCEL{'  '}
                </Text>
              </Button>
              <Button
                small
                onPress={() => {
                  this.props.cancelFunc();
                  this.props.trip &&
                    this.handleUpdateTrip(
                      this.props.trip._id,
                      this.state.tripnameChanged
                        ? this.tripname
                        : this.props.trip.tripname,
                      this.state.descriptionChanged
                        ? this.description
                        : this.props.trip.description,
                      this.state.startDateChanged
                        ? this.startDate
                        : this.props.trip.startDate,
                      this.state.endDateChanged
                        ? this.endDate
                        : this.props.trip.endDate,
                    );
                  !this.props.hotel &&
                    this.handleCreateTrip(
                      this.props.userId,
                      this.tripname,
                      this.description,
                      this.state.startDateChanged ? this.startDate : new Date(),
                      this.state.endDateChanged ? this.endDate : new Date(),
                      this.budget,
                    );
                }}>
                <Text style={styles.buttonWithWhiteText}>
                  {'    '}SAVE{'    '}
                </Text>
              </Button>
            </View>
          </ScrollView>
        </Modal>
      </View>
    );
  }
}

AddTripModal.propTypes = {
  visible: PropTypes.bool,
  cancelFunc: PropTypes.func,
  trip: PropTypes.object,
  userId: PropTypes.string,
};

const mapDispatchToProps = dispatch => ({
  createTrip: (userId, tripname, description, startDate, endDate, budget) =>
    dispatch(
      createTrip(userId, tripname, description, startDate, endDate, budget),
    ),

  updateTrip: (tripId, tripname, description, startDate, endDate) =>
    dispatch(updateTrip(tripId, tripname, description, startDate, endDate)),
});

export default connect(
  null,
  mapDispatchToProps,
)(AddTripModal);
