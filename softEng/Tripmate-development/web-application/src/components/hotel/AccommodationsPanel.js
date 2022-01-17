import React from 'react';
import PropTypes from 'prop-types';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ConnectedHotels from './Hotels';

export const AccommodationsPanel = props => {
  return (
    <ExpansionPanel defaultExpanded={false}>
      <ExpansionPanelSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header">
        <Typography variant="h6" component="h2">
          Accommodations
        </Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <ConnectedHotels tripId={props.tripId} />
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
};

AccommodationsPanel.propTypes = {
  tripId: PropTypes.string.isRequired,
};

export default AccommodationsPanel;
