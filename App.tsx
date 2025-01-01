/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect} from 'react';
import {RealmProvider} from '@realm/react';
import GigglifyNavigator from './src/nav/navigator';
import {SavedJoke} from './src/model/db/schema.ts';
import {readDateFormat} from './src/util/utils.ts';
import ErrorBoundary from 'react-native-error-boundary';

function GigglifyApp(): React.JSX.Element {

    useEffect(() => {
        readDateFormat().then();
    }, []);

    return (
        <ErrorBoundary onError={(e) => console.error(e)}>
            <RealmProvider schema={[SavedJoke]}>
                <GigglifyNavigator/>
            </RealmProvider>
        </ErrorBoundary>
    );
}

export default GigglifyApp;
