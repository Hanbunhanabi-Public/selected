import React from 'react';
import styles from '../../styles/Style';
import PropTypes from 'prop-types';
import {Button, Form, Item, Input, Label, DatePicker} from 'native-base';
import {View, Text, ScrollView} from 'react-native';
import Modal from 'react-native-modal';
import {createHotel} from '../../actions/Hotel/createHotel';
import {updateHotel} from '../../actions/Hotel/updateHotel';
import {connect} from 'react-redux';

export class AddHotelModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nameChanged: false,
      locationChanged: false,
      checkInDateChanged: false,
      checkOutDateChanged: false,
      priceChanged: false,
    };
  }

  handleCreateHotel(tripId, name, price, location, checkIn, checkOut) {
    this.props.createHotel(tripId, name, price, location, checkIn, checkOut);
  }

  handleUpdateHotel(hotelID, name, price, location, checkIn, checkOut) {
    this.props.updateHotel(hotelID, name, price, location, checkIn, checkOut);
  }

  render() {
    return (
      <Modal
        isVisible={this.props.visible}
        animationIn="slideInUp"
        animationOut="slideOutDown"
        style={styles.mediumModal}>
        <ScrollView>
          <View style={styles.modalView}>
            <Text style={styles.modalHeader}>
              {`${this.props.hotel ? 'Update' : 'Add'}`} Hotel
            </Text>
          </View>
          <Form>
            <Item stackedLabel>
              <Label>Name</Label>
              <Input
                defaultValue={this.props.hotel ? this.props.hotel.name : ''}
                onChangeText={textEntry => {
                  this.setState({nameChanged: true});
                  this.name = textEntry;
                }}
              />
            </Item>
            <View style={styles.parallelInputs}>
              <Item DatePicker stackedLabel>
                <Label>Check In</Label>
                <DatePicker
                  defaultDate={
                    this.props.hotel
                      ? new Date(this.props.hotel.checkIn)
                      : new Date()
                  }
                  animationType={'fade'}
                  onDateChange={newDate => {
                    this.setState({checkInDateChanged: true});
                    this.checkIn = newDate;
                  }}
                />
              </Item>
              <Item DatePicker stackedLabel>
                <Label>Check Out</Label>
                <DatePicker
                  defaultDate={
                    this.props.hotel
                      ? new Date(this.props.hotel.checkOut)
                      : new Date()
                  }
                  animationType={'fade'}
                  onDateChange={newDate => {
                    this.setState({checkOutDateChanged: true});
                    this.checkOut = newDate;
                  }}
                />
              </Item>
            </View>
            <Item stackedLabel>
              <Label>Location</Label>
              <Input
                defaultValue={this.props.hotel ? this.props.hotel.location : ''}
                onChangeText={textEntry => {
                  this.setState({locationChanged: true});
                  this.location = textEntry;
                }}
              />
            </Item>
            <Item stackedLabel>
              <Label>Price</Label>
              <Input
                defaultValue={this.props.hotel ? this.props.hotel.price : ''}
                onChangeText={textEntry => {
                  this.setState({priceChanged: true});
                  this.price = textEntry;
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
                this.props.hotel &&
                  this.handleUpdateHotel(
                    this.props.hotel._id,
                    this.state.nameChanged ? this.name : this.props.hotel.name,
                    this.state.priceChanged
                      ? this.price
                      : this.props.hotel.price,
                    this.state.locationChanged
                      ? this.location
                      : this.props.hotel.location,
                    this.state.checkInDateChanged
                      ? this.checkIn
                      : this.props.hotel.checkIn,
                    this.state.checkOutDateChanged
                      ? this.checkOut
                      : this.props.hotel.checkOut,
                  );
                !this.props.hotel &&
                  this.handleCreateHotel(
                    this.props.trip._id,
                    this.name,
                    this.price,
                    this.location,
                    this.state.checkInDateChanged ? this.checkIn : new Date(),
                    this.state.checkOutDateChanged ? this.checkOut : new Date(),
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

AddHotelModal.propTypes = {
  visible: PropTypes.bool,
  cancelFunc: PropTypes.func,
  hotel: PropTypes.object,
  trip: PropTypes.object,
};

const mapDispatchToProps = dispatch => ({
  createHotel: (tripId, name, price, location, checkIn, checkOut) =>
    dispatch(createHotel(tripId, name, price, location, checkIn, checkOut)),
  updateHotel: (hotelID, name, price, location, checkIn, checkOut) =>
    dispatch(updateHotel(hotelID, name, price, location, checkIn, checkOut)),
});

export default connect(
  null,
  mapDispatchToProps,
)(AddHotelModal);
