import React from 'react';
import PropTypes from 'prop-types';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ConnectedTicket from './Ticket';

export const TicketPanel = props => {
  return (
    <ExpansionPanel defaultExpanded={false}>
      <ExpansionPanelSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header">
        <Typography variant="h6" component="h2">
          Tickets
        </Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <ConnectedTicket tripId={props.tripId} />
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
};

TicketPanel.propTypes = {
  tripId: PropTypes.string.isRequired,
};

export default TicketPanel;
