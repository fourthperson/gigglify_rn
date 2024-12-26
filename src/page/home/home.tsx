import React from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import { primaryDarkColor, whiteColor } from '../../config/theme';
import { SafeAreaView } from 'react-native-safe-area-context';

function HomePage() : React.JSX.Element {
    return (
        <View style={styles.container}>
            <StatusBar backgroundColor={primaryDarkColor}/>
            <SafeAreaView style={styles.centeredItems}>

            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
            flex: 1,
            backgroundColor: whiteColor,
        },
    centeredItems: {
        flex: 1,
        justifyContent:'center',
            alignItems: 'center',
    },
});

export default HomePage;
