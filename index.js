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
import * as AxiosLogger from 'axios-logger';

export const appAxios = axios.create({
    baseURL: baseUrl,
    timeout: networkTimeout,
});
if (__DEV__) {
    appAxios.interceptors.request.use(AxiosLogger.requestLogger, AxiosLogger.errorLogger);
    appAxios.interceptors.response.use(AxiosLogger.responseLogger, AxiosLogger.errorLogger);
}

dayjs.extend(customParseFormat);

AppRegistry.registerComponent(appName, () => App);
