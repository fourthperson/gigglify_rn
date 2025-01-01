import {useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {
    StatusBar,
    StyleSheet,
    Text,
    View
} from 'react-native';
import {
    blackColor,
    boldFont,
    primaryColor,
    whiteColor
} from '../../config/theme';
import {splashDurationMillis} from '../../config/config';
import {routeHome} from '../../nav/routes';

function SplashPage(): React.JSX.Element {
    const navigation = useNavigation();

    useEffect(() => {
        setTimeout(() => {
            navigation.replace(routeHome);
        }, splashDurationMillis);
    });

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor={primaryColor}/>
            <Text style={styles.logoText}>Gigglify</Text>
        </View>
    );
}

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
