import React from 'react';
import PropTypes from 'prop-types';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ConnectedEvent from './Event';

export const EventsPanel = props => {
  return (
    <ExpansionPanel defaultExpanded={false}>
      <ExpansionPanelSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header">
        <Typography variant="h6" component="h2">
          Events
        </Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <ConnectedEvent tripId={props.tripId} />
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
};

EventsPanel.propTypes = {
  tripId: PropTypes.string.isRequired,
};

export default EventsPanel;
