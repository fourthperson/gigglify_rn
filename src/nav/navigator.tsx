import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {routeHome, routeSplash} from './routes';
import SplashPage from '../page/splash/splash';
import HomePage from '../page/home/home';
import {StyleSheet} from 'react-native';

const Stack = createNativeStackNavigator();

function GigglifyNavigator() {
    return (
        <GestureHandlerRootView style={styles.fullScreen}>
            <NavigationContainer>
                <Stack.Navigator
                    screenOptions={{headerShown: false}}
                    initialRouteName={routeSplash}>
                    <Stack.Screen
                        name={routeSplash}
                        component={SplashPage}/>
                    <Stack.Screen
                        name={routeHome}
                        component={HomePage}/>
                </Stack.Navigator>
            </NavigationContainer>
        </GestureHandlerRootView>
    );
}

const styles = StyleSheet.create({
    fullScreen: {
        flex: 1,
    },
});

export default GigglifyNavigator;
