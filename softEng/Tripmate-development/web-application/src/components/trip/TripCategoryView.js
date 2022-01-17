import React from 'react';
import PropTypes from 'prop-types';
import {FlightsPanel} from '../flight/FlightsPanel';
import {AccommodationsPanel} from '../hotel/AccommodationsPanel';
import {TodoPanel} from '../todo/TodoPanel';
import {TicketPanel} from '../ticket/TicketPanel';
import {EventsPanel} from '../event/EventsPanel';

export const TripCategoryView = props => {
  return (
    <div>
      <FlightsPanel tripId={props.tripId} />
      <TicketPanel tripId={props.tripId} />
      <AccommodationsPanel tripId={props.tripId} />
      <EventsPanel tripId={props.tripId} />
      <TodoPanel tripId={props.tripId} />
    </div>
  );
};

TripCategoryView.propTypes = {
  tripId: PropTypes.string.isRequired,
};

export default TripCategoryView;
