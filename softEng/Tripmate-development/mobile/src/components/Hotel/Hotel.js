import React from 'react';
import styles from '../../styles/Style';
import PropTypes from 'prop-types';
import {fetchHotel} from '../../actions/Hotel/fetchHotel';
import {deleteHotel} from '../../actions/Hotel/deleteHotel';
import {connect} from 'react-redux';
import ConnectedAddHotelModal from './AddHotelModal';

import {
  ListItem,
  List,
  Separator,
  Text,
  View,
  Spinner,
  Button,
  Icon,
} from 'native-base';
import {handleParseDate} from '../../utils/globalVars';

export class Hotel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      updateHotelModalVisible: false,
      chosenHotel: undefined,
    };
  }

  componentDidMount() {
    this.props.fetchHotel(this.props.trip._id);
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.deleteHotelLoading !== this.props.deleteHotelLoading ||
      prevProps.updateHotelLoading !== this.props.updateHotelLoading ||
      prevProps.createHotelLoading !== this.props.createHotelLoading
    ) {
      this.props.fetchHotel(this.props.trip._id);
    }
  }

  setUpdateHotelModalVisible(visible) {
    this.setState({updateHotelModalVisible: visible});
  }

  handleDeleteHotel(hotelId) {
    this.props.deleteHotel(hotelId);
  }

  render() {
    return !this.props.loading ? (
      <View>
        {this.props.hotel.length === 0 && (
          <Text>You don't have any hotels.</Text>
        )}
        {this.props.hotel.map(hotel => (
          <List key={hotel._id}>
            <ListItem itemDivider style={styles.listBanner}>
              <Text style={styles.listTitle}>{hotel.name}</Text>
              <View style={styles.listButtons}>
                <Button
                  small
                  transparent
                  primary
                  iconLeft
                  light
                  onPress={() => {
                    this.setState({
                      chosenHotel: hotel,
                    });
                    this.setUpdateHotelModalVisible(true);
                  }}>
                  <Icon style={styles.listIcon} name="md-create" />
                </Button>
                <Button
                  small
                  transparent
                  light
                  onPress={() => {
                    this.handleDeleteHotel(hotel._id);
                  }}>
                  <Icon style={styles.listIcon} name="md-remove-circle" />
                </Button>
              </View>
            </ListItem>

            <ListItem style={styles.listItemHolder}>
              <Text style={styles.boldText}>Check In</Text>
              <Text>{handleParseDate(hotel.checkIn, '-')}</Text>
            </ListItem>
            <ListItem style={styles.listItemHolder}>
              <Text style={styles.boldText}>Check Out</Text>
              <Text>{handleParseDate(hotel.checkOut, '-')}</Text>
            </ListItem>
            <ListItem style={styles.listItemHolder}>
              <Text style={styles.boldText}>Location</Text>
              <Text>{hotel.location}</Text>
            </ListItem>
            <ListItem style={styles.listItemHolder}>
              <Text style={styles.boldText}>Price</Text>
              <Text>{hotel.price}</Text>
            </ListItem>
            <ConnectedAddHotelModal
              visible={this.state.updateHotelModalVisible}
              cancelFunc={() =>
                this.setUpdateHotelModalVisible(
                  !this.state.updateHotelModalVisible,
                )
              }
              hotel={this.state.chosenHotel}
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

Hotel.propTypes = {
  trip: PropTypes.object,
  dispatch: PropTypes.func,
  hotel: PropTypes.array,
  loading: PropTypes.bool,
  createHotelMessage: PropTypes.string,
  createHotelLoading: PropTypes.bool,
  createHotelError: PropTypes.string,
  deleteHotelMessage: PropTypes.string,
  deleteHotelLoading: PropTypes.bool,
  deleteHotelError: PropTypes.string,
  updateHotelMessage: PropTypes.string,
  updateHotelLoading: PropTypes.bool,
  updateHotelError: PropTypes.string,
};

const mapStateToProps = state => ({
  hotel: state.hotel.getHotels.hotel,
  loading: state.hotel.getHotels.loading,
  error: state.hotel.getHotels.error,
  createHotelMessage: state.hotel.createHotel.createSuccessMessage,
  createHotelLoading: state.hotel.createHotel.createLoading,
  createHotelError: state.hotel.createHotel.createError,
  deleteHotelMessage: state.hotel.deleteHotel.deleteSuccessMessage,
  deleteHotelLoading: state.hotel.deleteHotel.deleteLoading,
  deleteHotelError: state.hotel.deleteHotel.deleteError,
  updateHotelMessage: state.hotel.updateHotel.updateSuccessMessage,
  updateHotelLoading: state.hotel.updateHotel.updateLoading,
  updateHotelError: state.hotel.updateHotel.updateError,
});

const mapDispatchToProps = dispatch => ({
  fetchHotel: tripId => dispatch(fetchHotel(tripId)),
  deleteHotel: id => dispatch(deleteHotel(id)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Hotel);
