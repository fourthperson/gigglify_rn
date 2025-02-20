import {StackActions, useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {StatusBar, StyleSheet, Text, View} from 'react-native';
import {
  blackColor,
  boldFont,
  whiteColor,
} from '../../config/theme';
import {splashDurationMillis} from '../../config/config';
import {routeHome} from '../../navigation/navigator.tsx';
import {useTranslation} from 'react-i18next';

const SplashPage = (): React.JSX.Element => {
  const navigation = useNavigation();

  const {t} = useTranslation();

  useEffect(() => {
    setTimeout(() => {
      navigation.dispatch(StackActions.replace(routeHome));
    }, splashDurationMillis);
  });

  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor={'transparent'}
        translucent={true}
        barStyle={'dark-content'}
      />
      <Text style={styles.logoText}>{t('app_name')}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: whiteColor,
  },
  logoText: {
    color: blackColor,
    fontSize: 32,
    fontFamily: boldFont,
  },
});

export default SplashPage;
