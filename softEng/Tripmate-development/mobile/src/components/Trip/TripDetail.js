import React, {Component} from 'react';
import PropTypes from 'prop-types';
import styles from '../../styles/Style';
import {View, Text, ScrollView} from 'react-native';
import {Button, Icon} from 'native-base';
import {Divider} from 'react-native-elements';
import {deleteTrip} from '../../actions/Trip/deleteTrip';
import MultipleAddButton from './MultipleAddButton';
import {connect} from 'react-redux';
import {handleParseDate} from '../../utils/globalVars';
import Categories from './Categories';

export class TripDetail extends Component {
  constructor(props) {
    super(props);
  }

  handleDeleteTrip(tripId) {
    this.props.deleteTrip(tripId);
  }

  render() {
    return (
      <ScrollView>
        <View style={styles.tripDetailBackToHomeButton}>
          <Button small iconLeft onPress={this.props.handleTripDetail}>
            <Icon name="arrow-back" />
            <Text style={styles.buttonWithWhiteText}>
              {'    '}TRIPS{'    '}
            </Text>
          </Button>
        </View>
        <View style={styles.tripDetailHeader}>
          <View style={styles.parallelPlaceHolderWithSpaceBetween}>
            <Text style={styles.tripDetailTitle}>
              {this.props.trip.tripname}
            </Text>
            <View style={styles.parallelPlaceHolder}>
              <Button
                small
                transparent
                onPress={() => {
                  this.handleDeleteTrip(this.props.trip._id);
                  this.props.handleTripDetail();
                }}>
                <Icon name="trash" style={styles.deleteButton} />
              </Button>
            </View>
          </View>
          <View style={styles.parallelPlaceHolderWithSpaceBetween}>
            <Text>{`${handleParseDate(
              this.props.trip.startDate,
              '/',
            )} - ${handleParseDate(this.props.trip.endDate, '/')}`}</Text>
            <MultipleAddButton trip={this.props.trip} />
          </View>
        </View>
        <Divider />
        <Categories trip={this.props.trip} />
      </ScrollView>
    );
  }
}

TripDetail.propTypes = {
  trip: PropTypes.object,
  handleTripDetail: PropTypes.func,
};

const mapDispatchToProps = dispatch => ({
  deleteTrip: tripId => dispatch(deleteTrip(tripId)),
});

export default connect(
  null,
  mapDispatchToProps,
)(TripDetail);
