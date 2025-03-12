/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect} from 'react';
import {RealmProvider} from '@realm/react';
import GigglifyNavigator from './src/navigation/navigator';
import {SavedJoke} from './src/types/types.ts';
import ErrorBoundary from 'react-native-error-boundary';
import {I18nextProvider} from 'react-i18next';
import i18n from './src/localization/i18n';
import {readDateFormat} from './src/prefs/local_pref';
import {Provider} from 'react-redux';
import store from './src/store/store';

const GigglifyApp = (): React.JSX.Element => {
  useEffect(() => {
    readDateFormat().then();
  }, []);

  return (
    <ErrorBoundary onError={e => console.error(e)}>
      <Provider store={store}>
        <RealmProvider schema={[SavedJoke]}>
          <I18nextProvider i18n={i18n}>
            <GigglifyNavigator />
          </I18nextProvider>
        </RealmProvider>
      </Provider>
    </ErrorBoundary>
  );
};

export default GigglifyApp;
