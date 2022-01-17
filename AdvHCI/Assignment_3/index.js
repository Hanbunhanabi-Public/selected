/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import Bugsnag from '@bugsnag/react-native';
Bugsnag.start();
AppRegistry.registerComponent(appName, () => App);
