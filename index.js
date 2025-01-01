/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import axios from 'axios';
import {baseUrl, networkTimeout} from './src/config/config';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import dayjs from 'dayjs';

export const appAxios = axios.create({
    baseURL: baseUrl,
    timeout: networkTimeout,
});

dayjs.extend(customParseFormat);

AppRegistry.registerComponent(appName, () => App);
