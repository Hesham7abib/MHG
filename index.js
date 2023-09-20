/**
 * @format
 */
import 'react-native-gesture-handler';
import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';
import src from '../LastApp/src/Index.js';

AppRegistry.registerComponent(appName, () => src);
