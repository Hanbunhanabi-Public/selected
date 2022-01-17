import React from 'react';
import styles from '../../styles/Style';
import PropTypes from 'prop-types';
import {fetchEvent} from '../../actions/Event/fetchEvent';
import {deleteEvent} from '../../actions/Event/deleteEvent';
import {connect} from 'react-redux';
import ConnectedAddEventModal from './AddEventModal';

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

export class Event extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      updateEventModalVisible: false,
      chosenEvent: undefined,
    };
  }

  componentDidMount() {
    this.props.fetchEvent(this.props.trip._id);
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.deleteEventLoading !== this.props.deleteEventLoading ||
      prevProps.updateEventLoading !== this.props.updateEventLoading ||
      prevProps.createEventLoading !== this.props.createEventLoading
    ) {
      this.props.fetchEvent(this.props.trip._id);
    }
  }

  setUpdateEventModalVisible(visible) {
    this.setState({updateEventModalVisible: visible});
  }

  handleDeleteEvent(eventId) {
    this.props.deleteEvent(eventId);
  }

  render() {
    return !this.props.loading ? (
      <View>
        {this.props.event.length === 0 && (
          <Text>You don't have any events.</Text>
        )}
        {this.props.event.map(event => (
          <List key={event._id}>
            <ListItem itemDivider style={styles.listBanner}>
              <Text style={styles.listTitle}>{event.title}</Text>
              <View style={styles.listButtons}>
                <Button
                  small
                  transparent
                  primary
                  iconLeft
                  light
                  onPress={() => {
                    this.setState({
                      chosenEvent: event,
                    });
                    this.setUpdateEventModalVisible(true);
                  }}>
                  <Icon style={styles.listIcon} name="md-create" />
                </Button>
                <Button
                  small
                  transparent
                  light
                  onPress={() => {
                    this.handleDeleteEvent(event._id);
                  }}>
                  <Icon style={styles.listIcon} name="md-remove-circle" />
                </Button>
              </View>
            </ListItem>
            <ListItem style={styles.listItemHolder}>
              <Text style={styles.boldText}>Start Date</Text>
              <Text>{handleParseDate(event.start, '-')}</Text>
            </ListItem>
            <ListItem style={styles.listItemHolder}>
              <Text style={styles.boldText}>End Date</Text>
              <Text>{handleParseDate(event.end, '-')}</Text>
            </ListItem>
            <ListItem style={styles.listItemHolder}>
              <Text style={styles.boldText}>Location</Text>
              <Text>{event.location}</Text>
            </ListItem>
            <ListItem style={styles.listItemHolder}>
              <Text style={styles.boldText}>Cost</Text>
              <Text>{event.cost}</Text>
            </ListItem>
            <ListItem style={styles.listItemHolder}>
              <Text style={styles.boldText}>Description</Text>
              <Text>{event.description}</Text>
            </ListItem>
            <ConnectedAddEventModal
              visible={this.state.updateEventModalVisible}
              cancelFunc={() =>
                this.setUpdateEventModalVisible(
                  !this.state.updateEventModalVisible,
                )
              }
              event={this.state.chosenEvent}
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

Event.propTypes = {
  trip: PropTypes.object,
  dispatch: PropTypes.func,
  event: PropTypes.array,
  loading: PropTypes.bool,
  createEventMessage: PropTypes.string,
  createEventLoading: PropTypes.bool,
  createEventError: PropTypes.string,
  deleteEventMessage: PropTypes.string,
  deleteEventLoading: PropTypes.bool,
  deleteEventError: PropTypes.string,
  updateEventMessage: PropTypes.string,
  updateEventLoading: PropTypes.bool,
  updateEventError: PropTypes.string,
};

const mapStateToProps = state => ({
  event: state.event.getEvent.event,
  loading: state.event.getEvent.loading,
  error: state.event.getEvent.error,
  createEventMessage: state.event.createEvent.createSuccessMessage,
  createEventLoading: state.event.createEvent.createLoading,
  createEventError: state.event.createEvent.createError,
  deleteEventMessage: state.event.deleteEvent.deleteSuccessMessage,
  deleteEventLoading: state.event.deleteEvent.deleteLoading,
  deleteEventError: state.event.deleteEvent.deleteError,
  updateEventMessage: state.event.updateEvent.updateSuccessMessage,
  updateEventLoading: state.event.updateEvent.updateLoading,
  updateEventError: state.event.updateEvent.updateError,
});

const mapDispatchToProps = dispatch => ({
  fetchEvent: tripId => dispatch(fetchEvent(tripId)),
  deleteEvent: id => dispatch(deleteEvent(id)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Event);
