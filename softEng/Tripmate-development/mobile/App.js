import React, {Component} from 'react';

import {View, Image, TouchableOpacity} from 'react-native';
import styles from './src/styles/Style';

import {createAppContainer} from 'react-navigation';
import {createDrawerNavigator} from 'react-navigation-drawer';
import {createStackNavigator} from 'react-navigation-stack';
import Home from './src/pages/Home';
import About from './src/pages/About';

class NavigationDrawerStructure extends Component {
  toggleDrawer = () => {
    this.props.navigationProps.toggleDrawer();
  };
  render() {
    return (
      <View style={styles.MainContainer}>
        <TouchableOpacity onPress={this.toggleDrawer.bind(this)}>
          <Image
            source={require('./image/drawer.png')}
            style={styles.DrawerImage}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

const Homepage_StackNavigator = createStackNavigator({
  First: {
    screen: Home,
    navigationOptions: ({navigation}) => ({
      title: 'TripMate',
      headerLeft: () => (
        <NavigationDrawerStructure navigationProps={navigation} />
      ),
      headerStyle: {
        backgroundColor: '#3f51b5',
      },
      headerTintColor: '#fff',
    }),
  },
});

const About_StackNavigator = createStackNavigator({
  Second: {
    screen: About,
    navigationOptions: ({navigation}) => ({
      title: 'TripMate',
      headerLeft: () => (
        <NavigationDrawerStructure navigationProps={navigation} />
      ),
      headerStyle: {
        backgroundColor: '#3f51b5',
      },
      headerTintColor: '#fff',
    }),
  },
});

const DrawerNavigatorExample = createDrawerNavigator({
  Home: {
    screen: Homepage_StackNavigator,
    navigationOptions: {
      drawerLabel: 'Home',
    },
  },
  About: {
    screen: About_StackNavigator,
    navigationOptions: {
      drawerLabel: 'About',
    },
  },
});

export default createAppContainer(DrawerNavigatorExample);
