import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InfoIcon from '@material-ui/icons/Info';
import HomeIcon from '@material-ui/icons/Home';
import HistoryIcon from '@material-ui/icons/History';
import '../../css/App.css';
import {Switch, Route, Link, BrowserRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import ConnectedTrips from '../trip/Trips';
import ConnectedPastTrips from '../trip/PastTrips';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
}));

function Dashboard(props) {
  const classes = useStyles();
  return props.user != null ? (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar} />
      <BrowserRouter>
        <Drawer
          className={classes.drawer}
          variant="permanent"
          classes={{
            paper: classes.drawerPaper,
          }}
          anchor="left">
          <div className={classes.toolbar} />
          <Divider />
          <List>
            {['Home', 'Past Trips'].map((text, index) => (
              <ListItem
                button
                key={text}
                component={Link}
                to={
                  text === 'Home'
                    ? `/${text.replace('Home', 'dashboard')}`
                    : `/${text.replace(/ /g, '')}`
                }>
                <ListItemIcon>
                  {index === 0 ? <HomeIcon /> : ''}
                  {index === 1 ? <HistoryIcon /> : ''}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            {['About'].map((text, index) => (
              <ListItem
                button
                key={text}
                component={Link}
                to={`/${text.replace(/ /g, '')}`}>
                <ListItemIcon>{index === 0 ? <InfoIcon /> : ''}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
        </Drawer>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Switch>
            <Route path="/dashboard" render={() => <ConnectedTrips />} />
            <Route path="/PastTrips" render={() => <ConnectedPastTrips />} />
            <Route
              path="/About"
              render={() => (
                <div>
                  {' '}
                  <h1>About</h1>
                  <p1>
                    {' '}
                    Tripmate is a distirbuted web and mobile application made by
                    Kurt&apos;s Angels (Group 3??) for Comp 4350 - Software
                    Engineering 2. It is the silver bullet for all things
                    organizing trips.
                  </p1>
                  <div id="Center">
                    <br />
                    Here&apos;s a picture of a CFL Legend after finally
                    realizing his dreams.
                    <div>
                      {' '}
                      <img
                        src="https://i.imgur.com/12xv91I.jpg"
                        alt="Kurt-CFL"
                      />
                    </div>
                  </div>
                </div>
              )}
            />
          </Switch>
        </main>
      </BrowserRouter>
    </div>
  ) : null;
}

Dashboard.propTypes = {
  user: PropTypes.shape({}),
};

const mapStateToProps = state => ({
  user: state.auth.user,
});

export default connect(mapStateToProps)(Dashboard);
