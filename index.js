/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import axios from 'axios';

export const appAxios = axios.create({
    baseURL: 'https://v2.jokeapi.dev/joke/',
    timeout: 150000,
});

AppRegistry.registerComponent(appName, () => App);
