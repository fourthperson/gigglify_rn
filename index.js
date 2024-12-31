/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import axios from 'axios';
import {baseUrl, networkTimeout} from './src/config/config';

export const appAxios = axios.create({
    baseURL: baseUrl,
    timeout: networkTimeout,
});

AppRegistry.registerComponent(appName, () => App);
