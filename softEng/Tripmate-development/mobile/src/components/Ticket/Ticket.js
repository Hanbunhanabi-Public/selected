import React from 'react';
import styles from '../../styles/Style';
import PropTypes from 'prop-types';
import {fetchTicket} from '../../actions/Ticket/fetchTicket';
import {deleteTicket} from '../../actions/Ticket/deleteTicket';
import {connect} from 'react-redux';
import ConnectedAddTicketModal from './AddTicketModal';

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

export class Ticket extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      updateTicketModalVisible: false,
      chosenTicket: undefined,
    };
  }

  componentDidMount() {
    this.props.fetchTicket(this.props.trip._id);
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.deleteTicketLoading !== this.props.deleteTicketLoading ||
      prevProps.updateTicketLoading !== this.props.updateTicketLoading ||
      prevProps.createTicketLoading !== this.props.createTicketLoading
    ) {
      this.props.fetchTicket(this.props.trip._id);
    }
  }

  setUpdateTicketModalVisible(visible) {
    this.setState({updateTicketModalVisible: visible});
  }

  handleDeleteTicket(ticketId) {
    this.props.deleteTicket(ticketId);
  }

  render() {
    return !this.props.loading ? (
      <View>
        {this.props.ticket.length === 0 && (
          <Text>You don't have any tickets.</Text>
        )}
        {this.props.ticket.map(ticket => (
          <List key={ticket._id}>
            <ListItem itemDivider style={styles.listBanner}>
              <Text style={styles.listTitle}>{ticket.transportType}</Text>
              <View style={styles.listButtons}>
                <Button
                  small
                  transparent
                  primary
                  iconLeft
                  light
                  onPress={() => {
                    this.setState({
                      chosenTicket: ticket,
                    });
                    this.setUpdateTicketModalVisible(true);
                  }}>
                  <Icon style={styles.listIcon} name="md-create" />
                </Button>
                <Button
                  small
                  transparent
                  light
                  onPress={() => {
                    this.handleDeleteTicket(ticket._id);
                  }}>
                  <Icon style={styles.listIcon} name="md-remove-circle" />
                </Button>
              </View>
            </ListItem>

            <List style={styles.listItemListHolder}>
              <Text style={styles.boldText}>Departure</Text>
              <ListItem style={styles.listItemListItemHolder}>
                <Text>Location</Text>
                <Text>{ticket.start.location}</Text>
              </ListItem>
              <ListItem style={styles.listItemListItemHolder}>
                <Text>Date</Text>
                <Text>{handleParseDate(ticket.start.date, '-')}</Text>
              </ListItem>
            </List>
            <List style={styles.listItemListHolder}>
              <Text style={styles.boldText}>Arrival</Text>
              <ListItem style={styles.listItemListItemHolder}>
                <Text>Location</Text>
                <Text>{ticket.end.location}</Text>
              </ListItem>
              <ListItem style={styles.listItemListItemHolder}>
                <Text>Date</Text>
                <Text>{handleParseDate(ticket.end.date, '-')}</Text>
              </ListItem>
            </List>
            {ticket.confirmationNumber && (
              <ListItem style={styles.listItemHolder}>
                <Text style={styles.boldText}>Confirmation Number</Text>
                <Text>{ticket.confirmationNumber}</Text>
              </ListItem>
            )}
            {ticket.notes && (
              <ListItem style={styles.listItemHolder}>
                <Text style={styles.boldText}>Notes</Text>
                <Text>{ticket.notes}</Text>
              </ListItem>
            )}
            <ConnectedAddTicketModal
              visible={this.state.updateTicketModalVisible}
              cancelFunc={() =>
                this.setUpdateTicketModalVisible(
                  !this.state.updateTicketModalVisible,
                )
              }
              ticket={this.state.chosenTicket}
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

Ticket.propTypes = {
  trip: PropTypes.object,
  dispatch: PropTypes.func,
  ticket: PropTypes.array,
  loading: PropTypes.bool,
  createTicketMessage: PropTypes.string,
  createTicketLoading: PropTypes.bool,
  createTicketError: PropTypes.string,
  deleteTicketMessage: PropTypes.string,
  deleteTicketLoading: PropTypes.bool,
  deleteTicketError: PropTypes.string,
  updateTicketMessage: PropTypes.string,
  updateTicketLoading: PropTypes.bool,
  updateTicketError: PropTypes.string,
};

const mapStateToProps = state => ({
  ticket: state.ticket.getTicket.ticket,
  loading: state.ticket.getTicket.loading,
  error: state.ticket.getTicket.error,
  createTicketMessage: state.ticket.createTicket.createSuccessMessage,
  createTicketLoading: state.ticket.createTicket.createLoading,
  createTicketError: state.ticket.createTicket.createError,
  deleteTicketMessage: state.ticket.deleteTicket.deleteSuccessMessage,
  deleteTicketLoading: state.ticket.deleteTicket.deleteLoading,
  deleteTicketError: state.ticket.deleteTicket.deleteError,
  updateTicketMessage: state.ticket.updateTicket.updateSuccessMessage,
  updateTicketLoading: state.ticket.updateTicket.updateLoading,
  updateTicketError: state.ticket.updateTicket.updateError,
});

const mapDispatchToProps = dispatch => ({
  fetchTicket: tripId => dispatch(fetchTicket(tripId)),
  deleteTicket: id => dispatch(deleteTicket(id)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Ticket);
