/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {RealmProvider} from '@realm/react';
import GigglifyNavigator from './src/nav/navigator';
import {SavedJoke} from './src/model/db/schema.ts';

function GigglifyApp(): React.JSX.Element {
    return (
        <RealmProvider schema={[SavedJoke]}>
            <GigglifyNavigator/>
        </RealmProvider>
    );
}

export default GigglifyApp;
