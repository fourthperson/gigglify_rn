import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {StyleSheet} from 'react-native';
import SplashPage from '../page/splash/splash.tsx';
import HomePage from '../page/home/home.tsx';

const Stack = createNativeStackNavigator();

export const routeSplash = 'splash';
export const routeHome = 'home';

const GigglifyNavigator = () => {
  return (
    <GestureHandlerRootView style={styles.fullScreen}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{headerShown: false}}
          initialRouteName={routeSplash}>
          <Stack.Screen name={routeSplash} component={SplashPage} />
          <Stack.Screen name={routeHome} component={HomePage} />
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  fullScreen: {
    flex: 1,
  },
});

export default GigglifyNavigator;
