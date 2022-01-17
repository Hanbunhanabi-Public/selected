import React from 'react';
import PropTypes from 'prop-types';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ConnectedBudget from './Budget';

export const BudgetPanel = props => {
  return (
    <ExpansionPanel defaultExpanded={true}>
      <ExpansionPanelSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header">
        <Typography variant="h6" component="h2">
          Budget
        </Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <ConnectedBudget tripId={props.tripId} />
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
};

BudgetPanel.propTypes = {
  tripId: PropTypes.string.isRequired,
};

export default BudgetPanel;
